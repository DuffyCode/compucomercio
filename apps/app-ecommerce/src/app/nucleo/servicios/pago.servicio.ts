import { Injectable, signal, computed } from '@angular/core';

/**
 * Interfaz para los métodos de envío disponibles.
 */
export interface MetodoEnvio {
    id: string;
    nombre: string;
    precio: number;
    fechaEntrega: string;
}

/**
 * Interfaz para la dirección de envío del usuario.
 */
export interface DireccionUsuario {
    nombre: string;
    pais: string;
    calle: string;
    ciudad: string;
    estado: string;
    codigoPostal: string;
    telefono: string;
}

/**
 * Servicio que gestiona el proceso de pago y checkout.
 * 
 * Este servicio es el corazón del flujo de compra. Controla desde la dirección de envío
 * hasta el método de pago seleccionado. Utiliza Angular Signals para que toda la UI
 * reaccione al instante sin necesidad de suscripciones pesadas.
 */
@Injectable({
    providedIn: 'root'
})
export class ServicioPago {
    // Almacena la dirección actual del usuario. Por defecto tiene mis datos de prueba.
    private senalDireccion = signal<DireccionUsuario>({
        nombre: 'José Cadenas',
        pais: 'España',
        calle: 'Calle de la Tecnología 42',
        ciudad: 'Madrid',
        estado: 'Madrid',
        codigoPostal: '28001',
        telefono: '+34 600 000 000'
    });

    private metodosEnvio: MetodoEnvio[] = [
        { id: 'estandar', nombre: 'Estándar', precio: 0, fechaEntrega: 'Entrega para el 28 de abr.' },
        { id: 'express', nombre: 'Rápido', precio: 1.50, fechaEntrega: 'Entrega para el 25 de abr.' }
    ];

    private senalIdEnvioSeleccionado = signal<string>('estandar');
    private senalPasoActual = signal<number>(1);

    // IMPORTANTE: Esta señal guarda una copia del pedido justo antes de vaciar el carrito.
    // Es vital para que la pantalla de éxito pueda mostrar qué se compró.
    private senalUltimoPedido = signal<any>(null);

    // Exponemos las señales como Readonly para proteger el estado desde fuera.
    direccion = this.senalDireccion.asReadonly();
    pasoActual = this.senalPasoActual.asReadonly();
    ultimoPedido = this.senalUltimoPedido.asReadonly();

    metodosEnvioDisponibles = signal(this.metodosEnvio).asReadonly();

    // Calculamos el método de envío seleccionado de forma reactiva.
    metodoEnvioSeleccionado = computed(() =>
        this.metodosEnvio.find(m => m.id === this.senalIdEnvioSeleccionado()) || this.metodosEnvio[0]
    );

    /**
     * Registra el pedido finalizado para mostrarlo en la pantalla de éxito.
     * Se debe llamar justo antes de limpiar el carrito.
     */
    registrarUltimoPedido(pedido: any) {
        this.senalUltimoPedido.set(pedido);
    }

    /**
     * Cambia el paso actual del proceso de checkout (1 al 5).
     * El paso 5 oculta automáticamente el stepper en el layout.
     */
    establecerPaso(paso: number) {
        this.senalPasoActual.set(paso);
    }

    /**
     * Selecciona un método de envío por su ID.
     */
    establecerMetodoEnvio(id: string) {
        this.senalIdEnvioSeleccionado.set(id);
    }

    /**
     * Actualiza la dirección de envío registrada con nuevos datos.
     */
    actualizarDireccion(direccion: DireccionUsuario) {
        this.senalDireccion.set(direccion);
    }
}
