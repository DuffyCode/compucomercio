import { bootstrapApplication } from '@angular/platform-browser';
import { aplicacionConfig } from './app/nucleo/aplicacion.config';
import { ComponentePrincipal } from './app/disposicion/principal';

bootstrapApplication(ComponentePrincipal, aplicacionConfig)
  .catch((err) => console.error(err));
