import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ServicioUsuario } from '../../nucleo/servicios/usuario.servicio';
import { deslizarY, desvanecer } from '../../compartido/animaciones';

/**
 * @file perfil-pagina.componente.ts
 * @description Panel principal de la cuenta del usuario autenticado.
 *
 * Muestra un resumen de toda la información del usuario obtenida desde
 * el `ServicioUsuario`. Proporciona accesos rápidos para editar la
 * información personal, ver el historial de pedidos y cerrar sesión.
 *
 * Si un usuario no autenticado intenta acceder (o se pierde la sesión),
 * muestra un estado vacío invitándolo a iniciar sesión de nuevo.
 */
@Component({
  selector: 'app-perfil-pagina',
  standalone: true,
  imports: [CommonModule, RouterLink],
  animations: [deslizarY, desvanecer],
  template: `
    <ng-container *ngIf="sUsuario.estaLogueado(); else noLogueado">
      <div class="perfil-wrapper" @deslizarY>
        <!-- Header del Perfil -->
        <div class="perfil-header">
          <div class="header-bg"></div>
          <div class="header-content">
            <div class="avatar-wrap">
              <img [src]="usuario()?.avatar" [alt]="usuario()?.nombre" class="avatar" />
              <div class="avatar-badge">✓</div>
            </div>
            <div class="user-info">
              <h1>{{ usuario()?.nombre }} {{ usuario()?.apellido }}</h1>
              <p>{{ usuario()?.email }}</p>
            </div>
            <a routerLink="/perfil/editar" class="btn btn-secondary edit-btn">Modificar</a>
          </div>
        </div>

        <div class="perfil-body">
          <!-- Información del usuario -->
          <div class="section-card">
            <h2 class="section-title">Información de {{ usuario()?.nombre }} {{ usuario()?.apellido }}</h2>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Nombre completo</span>
                <span class="info-value">{{ usuario()?.nombre }} {{ usuario()?.apellido }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Correo electrónico</span>
                <span class="info-value">{{ usuario()?.email }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Teléfono</span>
                <span class="info-value">{{ usuario()?.telefono }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Género</span>
                <span class="info-value">{{ usuario()?.genero }}</span>
              </div>
            </div>
            <a routerLink="/cambiar-contrasena" class="change-pass-link">🔑 Cambiar contraseña</a>
          </div>

          <!-- Acceso rápido -->
          <div class="section-card">
            <h2 class="section-title">Acceso rápido</h2>
            <div class="quick-links">
              <a routerLink="/mis-pedidos" class="quick-link">
                <div class="quick-icon view">👁️</div>
                <div class="quick-text">
                  <span class="quick-title">Ver Mis Pedidos</span>
                  <span class="quick-sub">Consulta el estado de tus compras</span>
                </div>
                <span class="arrow">›</span>
              </a>
              <button (click)="cerrarSesion()" class="quick-link logout">
                <div class="quick-icon exit">🚪</div>
                <div class="quick-text">
                  <span class="quick-title">Salir De Mi Cuenta</span>
                  <span class="quick-sub">Cerrar sesión de forma segura</span>
                </div>
                <span class="arrow">›</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ng-container>

    <ng-template #noLogueado>
      <div class="no-session" @desvanecer>
        <span class="ns-icon">🔒</span>
        <h2>Inicia sesión para ver tu perfil</h2>
        <a routerLink="/login" class="btn btn-primary" style="margin-top:1.5rem">Iniciar sesión</a>
      </div>
    </ng-template>
  `,
  styles: [`
    .perfil-wrapper { max-width: 800px; margin: 0 auto; padding: 2rem 1rem 4rem; }
    .perfil-header {
      position: relative; border-radius: var(--radius-2xl); overflow: hidden;
      margin-bottom: 2rem;
    }
    .header-bg {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%);
    }
    .header-content {
      position: relative; display: flex; align-items: center; gap: 1.5rem;
      padding: 2.5rem 2rem;
    }
    .avatar-wrap { position: relative; flex-shrink: 0; }
    .avatar { width: 90px; height: 90px; border-radius: 50%; object-fit: cover; border: 4px solid rgba(255,255,255,0.3); }
    .avatar-badge {
      position: absolute; bottom: 4px; right: 4px;
      width: 24px; height: 24px; background: #10b981;
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-size: 0.7rem; color: white; border: 2px solid white;
    }
    .user-info { flex: 1; color: white; }
    .user-info h1 { font-size: 1.75rem; font-weight: 800; margin-bottom: 0.25rem; }
    .user-info p { opacity: 0.8; font-size: 0.95rem; }
    .edit-btn { background: rgba(255,255,255,0.15); color: white; border-color: rgba(255,255,255,0.3); }
    .edit-btn:hover { background: rgba(255,255,255,0.25); }
    .perfil-body { display: flex; flex-direction: column; gap: 1.5rem; }
    .section-card {
      background: white; border-radius: var(--radius-xl); padding: 2rem;
      box-shadow: var(--shadow-sm); border: 1px solid var(--border);
    }
    .section-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 1.5rem; color: var(--text-main); }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
    .info-item { display: flex; flex-direction: column; gap: 0.25rem; }
    .info-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
    .info-value { font-size: 1rem; font-weight: 500; color: var(--text-main); }
    .change-pass-link { display: inline-block; margin-top: 1.5rem; color: var(--primary); text-decoration: none; font-size: 0.9rem; font-weight: 600; }
    .quick-links { display: flex; flex-direction: column; }
    .quick-link, .quick-link.logout {
      display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem;
      border-radius: var(--radius-lg); text-decoration: none; color: var(--text-main);
      transition: var(--transition); background: none; border: none; cursor: pointer;
      width: 100%; text-align: left;
    }
    .quick-link:hover, .quick-link.logout:hover { background: var(--background); }
    .quick-icon {
      width: 48px; height: 48px; border-radius: var(--radius-lg);
      display: flex; align-items: center; justify-content: center; font-size: 1.25rem;
    }
    .quick-icon.view { background: #eff6ff; }
    .quick-icon.exit { background: #fef2f2; }
    .quick-text { flex: 1; display: flex; flex-direction: column; gap: 0.2rem; }
    .quick-title { font-weight: 600; font-size: 0.95rem; }
    .quick-sub { font-size: 0.8rem; color: var(--text-muted); }
    .arrow { font-size: 1.5rem; color: var(--text-muted); }
    .no-session { text-align: center; padding: 6rem 2rem; display: flex; flex-direction: column; align-items: center; }
    .ns-icon { font-size: 4rem; margin-bottom: 1rem; }
    @media (max-width: 600px) { .info-grid { grid-template-columns: 1fr; } }
  `]
})
export class PerfilPaginaComponente {
  sUsuario = inject(ServicioUsuario);
  private router = inject(Router);

  usuario = this.sUsuario.sesionActiva;

  cerrarSesion() {
    this.sUsuario.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
