/**
 * @file animaciones.ts
 * @description Biblioteca de animaciones reutilizables para toda la aplicación.
 *
 * Centralizo aquí todas las animaciones de Angular para no repetirlas en cada componente.
 * Para usar una animación, sólo hay que importarla y agregarla al array `animations` del
 * componente que la necesita, y luego usar la directiva `@nombreAnimacion` en el template.
 *
 * Animaciones disponibles:
 * - `desvanecer`      → Fade in/out suave (ideal para modales, overlays)
 * - `deslizarY`       → Entrada con deslizamiento vertical + rebote (tarjetas, paneles)
 * - `cascada`         → Animación en cascada para listas (los items aparecen uno a uno)
 * - `animacionRuta`   → Transición entre páginas al cambiar de ruta
 */
import {
    trigger,
    transition,
    style,
    query,
    animate,
    stagger,
    animateChild,
    group
} from '@angular/animations';

/**
 * Animación de desvanecimiento suave (Fade In)
 */
export const desvanecer = trigger('desvanecer', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
    ]),
    transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
    ])
]);

/**
 * Animación de entrada con deslizamiento vertical
 */
export const deslizarY = trigger('deslizarY', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
    ])
]);

/**
 * Animación de cascada (Stagger) para listas
 */
export const cascada = trigger('cascada', [
    transition('* => *', [
        query(':enter', [
            style({ opacity: 0, transform: 'translateY(15px)' }),
            stagger(100, [
                animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ], { optional: true })
    ])
]);

/**
 * Animación para transiciones de ruta
 */
export const animacionRuta = trigger('animacionRuta', [
    transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                opacity: 0
            })
        ], { optional: true }),
        query(':enter', [
            style({ opacity: 0, transform: 'translateY(10px)' })
        ], { optional: true }),
        group([
            query(':leave', [
                animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
            ], { optional: true }),
            query(':enter', [
                animate('400ms 200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ], { optional: true })
        ])
    ])
]);
