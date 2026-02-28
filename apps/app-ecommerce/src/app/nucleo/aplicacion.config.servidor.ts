/**
 * @file aplicacion.config.servidor.ts
 * @description Configuración de Angular para el entorno de servidor (SSR).
 *
 * Este archivo extiende la configuración principal del cliente (aplicacion.config.ts)
 * y agrega los providers necesarios para que la app funcione en Node.js con
 * Server-Side Rendering (SSR). Uso `mergeApplicationConfig` para no duplicar
 * la configuración base.
 *
 * La configuración del servidor añade:
 * - `provideServerRendering`: habilita el renderizado en servidor
 * - Las rutas de servidor definidas en `aplicacion.rutas.servidor.ts` que controlan
 *   qué páginas se renderizan en servidor y cuáles en el cliente
 */
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { aplicacionConfig } from './aplicacion.config';
import { serverRoutes } from './aplicacion.rutas.servidor';

const configuracionServidor: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

export const config = mergeApplicationConfig(aplicacionConfig, configuracionServidor);
