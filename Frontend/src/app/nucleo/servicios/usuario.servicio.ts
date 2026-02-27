/**
 * @file usuario.servicio.ts
 * @description Servicio que gestiona la sesión del usuario y su historial de pedidos.
 *
 * Por ahora la autenticación es simulada (mock): cualquier email con contraseña
 * de más de 6 caracteres inicia sesión. Cuando se integre un backend real,
 * los métodos `iniciarSesion` y `registrar` deben hacer llamadas HTTP y
 * guardar el token de sesión en localStorage o en una cookie segura.
 *
 * El estado del usuario se mantiene con Angular Signals para que cualquier
 * componente que lo inyecte se actualice automáticamente.
 */
import { Injectable, signal, computed } from '@angular/core';

/** Datos del usuario autenticado en la aplicación. */
export interface Usuario {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    genero: string;
    avatar?: string;
}

/** Estructura de un pedido realizado por el usuario. */
export interface Pedido {
    id: string;
    fecha: string;
    estado: 'pendiente' | 'enviado' | 'entregado' | 'cancelado';
    total: number;
    productos: { id: string | number; nombre: string; cantidad: number; precio: number; imagen: string }[];
}

/**
 * Servicio encargado de la gestión de identidad y compras del usuario.
 * 
 * Este servicio centraliza el perfil del usuario (José Cadenas), su sesión simulada
 * y el histórico de sus pedidos. Utiliza Angular Signals para ofrecer una reactividad
 * eficiente en toda la aplicación.
 */
@Injectable({
    providedIn: 'root'
})
export class ServicioUsuario {
    /** Señal privada que mantiene el estado del usuario logueado. */
    private _sesionActiva = signal<Usuario | null>({
        id: 'USR-JOSE',
        nombre: 'José',
        apellido: 'Cadenas',
        email: 'jogacaz10@gmail.com',
        telefono: '+1 (555) 234-5678',
        genero: 'Masculino'
    });

    /** Lista reactiva de pedidos históricos del usuario. */
    pedidos = signal<Pedido[]>([
        {
            id: 'ORD-2024-001',
            fecha: '2024-11-15',
            estado: 'entregado',
            total: 1299,
            productos: [
                { id: 'LAP-001', nombre: 'Laptop Predator Helios 300', cantidad: 1, precio: 1299, imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=80' }
            ]
        },
        {
            id: 'ORD-2024-002',
            fecha: '2024-12-03',
            estado: 'enviado',
            total: 218,
            productos: [
                { id: 'TEC-001', nombre: 'Teclado Logitech MX Keys', cantidad: 1, precio: 119, imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80' },
                { id: 'ACC-001', nombre: 'Mouse Logitech MX Master 3', cantidad: 1, precio: 99, imagen: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&auto=format&fit=crop&q=80' }
            ]
        }
    ]);

    /** Selector de sólo lectura para la sesión del usuario. */
    sesionActiva = this._sesionActiva.asReadonly();

    /** Indica si hay un usuario con sesión iniciada. */
    estaLogueado = computed(() => this._sesionActiva() !== null);

    /** Retorna los pedidos filtrados que aún no se han entregado. */
    pedidosPendientes = computed(() =>
        this.pedidos().filter(p => p.estado === 'pendiente' || p.estado === 'enviado')
    );

    /** Retorna el historial de pedidos finalizados o cancelados. */
    historialPedidos = computed(() =>
        this.pedidos().filter(p => p.estado === 'entregado' || p.estado === 'cancelado')
    );

    /**
     * Registra un nuevo pedido en el historial.
     * @param pedido El objeto del pedido a guardar.
     */
    registrarPedido(pedido: Pedido) {
        this.pedidos.update(p => [pedido, ...p]);
    }

    /**
     * Actualiza los datos del perfil actual.
     * @param datos Objeto con los campos a modificar.
     */
    actualizarPerfil(datos: Partial<Usuario>) {
        this._sesionActiva.update(s => s ? { ...s, ...datos } : null);
    }

    /**
     * Crea una nueva sesión de usuario con los datos proporcionados.
     * Genera automáticamente un ID de usuario para cumplir con la interfaz.
     */
    registrar(datos: Omit<Usuario, 'id'>) {
        const nuevoUsuario: Usuario = {
            id: 'USR-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
            ...datos
        };
        this._sesionActiva.set(nuevoUsuario);
    }

    /**
     * Finaliza la sesión actual.
     */
    cerrarSesion() {
        this._sesionActiva.set(null);
    }

    /**
     * Inicia sesión (Simulación con datos por defecto de José).
     */
    login() {
        this._sesionActiva.set({
            id: 'USR-JOSE',
            nombre: 'José',
            apellido: 'Cadenas',
            email: 'jogacaz10@gmail.com',
            telefono: '+1 (555) 234-5678',
            genero: 'Masculino'
        });
    }
}
