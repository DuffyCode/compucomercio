/**
 * @file aplicacion.rutas.servidor.ts
 * @description Estrategia de renderizado para las rutas en el servidor (SSR).
 *
 * Aquí defino cómo se renderiza cada ruta cuando el servidor recibe una petición.
 * Por ahora uso `RenderMode.Server` en el wildcard `**` para que TODAS las rutas
 * se rendericen en el servidor, lo que mejora el SEO y el tiempo de primera carga.
 *
 * Si en el futuro quisiera que alguna ruta se renderice solo en el cliente
 * (por ejemplo, el dashboard de usuario), podría agregar una entrada específica
 * con `RenderMode.Client` antes del wildcard.
 */
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
