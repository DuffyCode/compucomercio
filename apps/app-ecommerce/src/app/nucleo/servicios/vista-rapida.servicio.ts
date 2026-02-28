/**
 * @file vista-rapida.servicio.ts
 * @description Servicio para controlar el estado del modal de vista rápida de productos.
 *
 * La vista rápida es un modal que se muestra cuando el usuario hace clic en
 * "Ver rápido" desde una tarjeta de producto, sin necesidad de navegar al
 * detalle completo del producto.
 *
 * El componente que renderiza el modal es `ComponenteVistaRapida` (compartido/ui).
 * Cualquier componente que quiera abrir la vista rápida inyecta este servicio
 * y llama a `abrir(producto)`. El servicio es el único que sabe si el modal
 * está abierto o cerrado, evitando pasar eventos entre componentes.
 */
import { Injectable, signal } from '@angular/core';

/**
 * Interfaz que define el producto mostrado en la vista rápida.
 */
export interface ProductoVistaRapida {
    id: number | string;
    nombre: string;
    codigo: string;
    precio: number | string;
    calificacion?: number;
    imagen?: string;
    enOferta?: boolean;
}

/**
 * Servicio para controlar el estado de la ventana emergente de vista rápida.
 */
@Injectable({
    providedIn: 'root'
})
export class ServicioVistaRapida {
    private senalEstaAbierto = signal(false);
    private senalProductoSeleccionado = signal<ProductoVistaRapida | null>(null);

    // Selectores públicos
    estaAbierto = this.senalEstaAbierto.asReadonly();
    productoSeleccionado = this.senalProductoSeleccionado.asReadonly();

    /**
     * Abre la vista rápida para un producto específico.
     * @param producto - El producto a mostrar.
     */
    abrir(producto: ProductoVistaRapida) {
        this.senalProductoSeleccionado.set(producto);
        this.senalEstaAbierto.set(true);
    }

    /**
     * Cierra la vista rápida.
     */
    cerrar() {
        this.senalEstaAbierto.set(false);
        // Esperar a que termine la animación de cierre antes de limpiar el producto
        setTimeout(() => this.senalProductoSeleccionado.set(null), 300);
    }
}
