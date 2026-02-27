/**
 * @file server.ts
 * @description Servidor web de Node.js (Express) para Angular SSR.
 *
 * Este archivo configura un servidor Express que se encarga de:
 * 1. Servir los archivos estáticos (imágenes, CSS, JS del build).
 * 2. Interceptar las demás peticiones y pasárselas al motor de Angular SSR
 *    (`AngularNodeAppEngine`) para que renderice el HTML dinámicamente.
 * 3. Exponer APIs REST si fuera necesario.
 */
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Configuro la entrega de archivos estáticos desde la carpeta /browser.
 * Se cachean por 1 año porque los nombres de archivo incluyen hashes.
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Para cualquier otra ruta, delego el renderizado a la aplicación Angular.
 * AngularNodeAppEngine se encargará de ejecutar el componente correspondiente
 * y devolver el HTML ya procesado.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
