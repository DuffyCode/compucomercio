/**
 * @file aplicacion.config.ts
 * @description Configuración central de la aplicación Angular.
 *
 * Aquí registro todos los providers globales que necesita la app para funcionar:
 * - El router con mis rutas personalizadas (aplicacion.rutas.ts)
 * - Las animaciones de forma asíncrona para no bloquear la carga inicial
 * - La hidratación del cliente con replay de eventos (necesario para SSR con Angular Universal)
 * - La detección de cambios con eventCoalescing para mejorar el rendimiento
 *
 * Si alguien necesita agregar un nuevo provider global (como un interceptor HTTP o un servicio
 * de traducción), este es el lugar correcto para hacerlo.
 */
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { rutas } from './aplicacion.rutas';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const aplicacionConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(rutas),
    provideAnimationsAsync(),
    provideClientHydration(withEventReplay())
  ]
};
