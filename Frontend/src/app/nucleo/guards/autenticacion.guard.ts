import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { ServicioUsuario } from '../servicios/usuario.servicio';

/**
 * Guard funcional que protege rutas requiriendo una sesión activa.
 * Si el usuario no está logueado, lo redirige a la página de login.
 */
export const autenticacionGuard: CanActivateFn = (route, state) => {
    const sUsuario = inject(ServicioUsuario);
    const router = inject(Router);

    if (sUsuario.estaLogueado()) {
        return true;
    }

    // Redirigir al login si no hay sesión
    return router.createUrlTree(['/login']);
};
