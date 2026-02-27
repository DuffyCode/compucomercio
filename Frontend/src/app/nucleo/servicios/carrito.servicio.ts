import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioUsuario } from './usuario.servicio';

/**
 * Interfaz que define la estructura de un artículo en el carrito.
 */
export interface ArticuloCarrito {
    id: string | number;
    nombre: string;
    codigo: string;
    precio: number;
    cantidad: number;
    imagen?: string;
    variante?: string;
    guardado?: boolean;
}

/**
 * Servicio encargado de gestionar el estado del carrito de compras.
 */
@Injectable({
    providedIn: 'root'
})
export class ServicioCarrito {
    private router = inject(Router);
    private sUsuario = inject(ServicioUsuario);

    // Señal privada que almacena los artículos del carrito
    private senalArticulosCarrito = signal<ArticuloCarrito[]>([]);

    // Selectores públicos (solo lectura)
    articulos = this.senalArticulosCarrito.asReadonly();

    // Artículos activos (no guardados)
    articulosActivos = computed(() => this.senalArticulosCarrito().filter(a => !a.guardado));

    // Total de productos activos
    totalProductos = computed(() =>
        this.articulosActivos().reduce((acc, item) => acc + item.cantidad, 0)
    );

    // Subtotal de la compra (solo productos activos)
    subtotal = computed(() =>
        this.articulosActivos().reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
    );

    // Costo de envío (gratis si la compra supera los 500, o 0 si no hay items)
    envio = computed(() => {
        const sub = this.subtotal();
        if (sub === 0) return 0;
        return sub > 500 ? 0 : 15;
    });

    // Impuesto estimado (15%)
    impuesto = computed(() => this.subtotal() * 0.15);

    // Total final de la orden
    totalTotal = computed(() => {
        const sub = this.subtotal();
        if (sub === 0) return 0;
        return sub + this.envio() + this.impuesto();
    });

    /**
     * Alterna el estado de "guardado para después" de un artículo.
     * @param id - Identificador del artículo.
     */
    toggleGuardado(id: string | number) {
        this.senalArticulosCarrito.update(items =>
            items.map(item =>
                item.id === id ? { ...item, guardado: !item.guardado } : item
            )
        );
    }

    /**
     * Agrega un producto al carrito o incrementa su cantidad si ya existe.
     * REQUISITO: Debe haber una sesión activa.
     */
    agregarAlCarrito(producto: any, cantidad: number = 1) {
        if (!this.sUsuario.estaLogueado()) {
            this.router.navigate(['/login']);
            return;
        }

        const articulosActuales = this.senalArticulosCarrito();
        const articuloExistente = articulosActuales.find(item => item.id === producto.id);

        const valorPrecio = typeof producto.precio === 'string'
            ? parseFloat(producto.precio.replace(/[^0-9.-]+/g, ""))
            : producto.precio;

        if (articuloExistente) {
            this.actualizarCantidad(producto.id, cantidad);
        } else {
            const nuevoArticulo: ArticuloCarrito = {
                id: producto.id,
                nombre: producto.name || producto.nombre,
                codigo: producto.code || producto.codigo || producto.id,
                precio: valorPrecio,
                cantidad: cantidad,
                imagen: producto.image || producto.imagen
            };
            this.senalArticulosCarrito.update(items => [...items, nuevoArticulo]);
        }
    }

    /** Actualiza la cantidad de un artículo. */
    actualizarCantidad(id: string | number, delta: number) {
        this.senalArticulosCarrito.update(items =>
            items.map(item => {
                if (item.id === id) {
                    const nuevaCant = Math.max(1, item.cantidad + delta);
                    return { ...item, cantidad: nuevaCant };
                }
                return item;
            })
        );
    }

    /** Elimina un artículo del carrito. (Nombre esperado por la App) */
    eliminarDelCarrito(id: string | number) {
        this.senalArticulosCarrito.update(items => items.filter(item => item.id !== id));
    }

    /** Limpia todo el carrito. (Nombre esperado por la App) */
    vaciarCarrito() {
        this.senalArticulosCarrito.set([]);
    }

    /** Mantiene compatibilidad con nombres internos si se usaran */
    limpiarCarrito() { this.vaciarCarrito(); }
    eliminarArticulo(id: string | number) { this.eliminarDelCarrito(id); }
}
