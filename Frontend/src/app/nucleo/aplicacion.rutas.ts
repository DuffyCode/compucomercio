/**
 * @file aplicacion.rutas.ts
 * @description Mapa de navegación completo de la aplicación con guardias de seguridad.
 */
import { Routes } from '@angular/router';
import { autenticacionGuard } from './guards/autenticacion.guard';

export const rutas: Routes = [
    {
        path: '',
        loadComponent: () => import('../paginas/inicio/inicio.componente').then(m => m.PaginaInicio)
    },
    {
        path: 'categoria/:id',
        loadComponent: () => import('../paginas/productos/productos-pagina.componente').then(m => m.PaginaProductos)
    },
    {
        path: 'busqueda',
        loadComponent: () => import('../paginas/busqueda/busqueda-pagina.componente').then(m => m.PaginaBusqueda)
    },
    {
        path: 'producto/:id',
        loadComponent: () => import('../paginas/detalle-producto/detalle-producto-pagina.componente').then(m => m.PaginaDetalleProducto)
    },
    {
        path: 'carrito',
        loadComponent: () => import('../paginas/carrito/carrito-pagina.componente').then(m => m.PaginaCarrito),
        canActivate: [autenticacionGuard]
    },
    {
        path: 'pago',
        loadComponent: () => import('../paginas/pago/pago-disposicion.componente').then(m => m.ComponenteDisposicionPago),
        canActivate: [autenticacionGuard],
        children: [
            { path: '', redirectTo: 'paso-1', pathMatch: 'full' },
            {
                path: 'paso-1',
                loadComponent: () => import('../paginas/pago/ui/pago-resumen.componente').then(m => m.ComponenteResumenPago)
            },
            {
                path: 'direccion',
                loadComponent: () => import('../paginas/pago/ui/pago-direccion.componente').then(m => m.ComponentePagoDireccion)
            },
            {
                path: 'tarjeta',
                loadComponent: () => import('../paginas/pago/ui/pago-tarjeta.componente').then(m => m.ComponentePagoTarjeta)
            },
            {
                path: 'confirmar',
                loadComponent: () => import('../paginas/pago/ui/pago-pago.componente').then(m => m.ComponentePagoFinal)
            },
            {
                path: 'exito',
                loadComponent: () => import('../paginas/pago/ui/pago-exito.componente').then(m => m.ComponentePagoExito)
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('../paginas/usuario/login-pagina.componente').then(m => m.LoginPaginaComponente)
    },
    {
        path: 'registro',
        loadComponent: () => import('../paginas/usuario/registro-pagina.componente').then(m => m.RegistroPaginaComponente)
    },
    {
        path: 'perfil',
        loadComponent: () => import('../paginas/usuario/perfil-pagina.componente').then(m => m.PerfilPaginaComponente)
    },
    {
        path: 'perfil/editar',
        loadComponent: () => import('../paginas/usuario/perfil-editar.componente').then(m => m.PerfilEditarComponente)
    },
    {
        path: 'cambiar-contrasena',
        loadComponent: () => import('../paginas/usuario/cambiar-contrasena.componente').then(m => m.CambiarContrasenaPaginaComponente)
    },
    {
        path: 'mis-pedidos',
        loadComponent: () => import('../paginas/usuario/mis-pedidos.componente').then(m => m.MisPedidosComponente)
    }
];
