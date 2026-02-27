/**
 * @file main.ts
 * @description Punto de entrada principal de la aplicación en el lado del cliente (Navegador).
 *
 * Aquí es donde Angular inicia (hace bootstrap) de la aplicación usando
 * el `ComponentePrincipal` como raíz y aplicando la configuración global
 * definida en `aplicacion.config.ts`.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { aplicacionConfig } from './app/nucleo/aplicacion.config';
import { ComponentePrincipal } from './app/disposicion/principal';

bootstrapApplication(ComponentePrincipal, aplicacionConfig)
  .catch((err) => console.error(err));
