/**
 * @file main.server.ts
 * @description Punto de entrada de la aplicación para el renderizado en servidor (SSR).
 *
 * Cuando Node.js (a través de Express) necesita renderizar una página,
 * llama a esta función de arranque. Utiliza una configuración combinada
 * (`config` de aplicacion.config.servidor.ts) que incluye los providers
 * específicos de SSR.
 */
import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { ComponentePrincipal } from './app/disposicion/principal';
import { config } from './app/nucleo/aplicacion.config.servidor';

const arranque = (context: BootstrapContext) =>
    bootstrapApplication(ComponentePrincipal, config, context);

export default arranque;
