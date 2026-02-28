import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServicioUsuario } from '../../nucleo/servicios/usuario.servicio';
import { deslizarY } from '../../compartido/animaciones';

/**
 * @file login-pagina.componente.ts
 * @description Página de inicio de sesión de usuario.
 *
 * Muestra un formulario para ingresar credenciales y acceder a la cuenta.
 * Utiliza `ServicioUsuario` para validar. Si la validación es exitosa,
 * redirige al perfil del usuario. También incluye enlaces para crear
 * una cuenta nueva o recuperar la contraseña.
 */
@Component({
  selector: 'app-login-pagina',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  animations: [deslizarY],
  template: `
    <div class="auth-wrapper">
      <div class="auth-card" @deslizarY>
        <div class="auth-brand">
          <span>🚀</span>
          <span class="brand-name">CompuComercio</span>
        </div>
        <h1>Bienvenido de nuevo</h1>
        <p class="subtitle">Inicia sesión para continuar</p>

        <div class="error-msg" *ngIf="error()">{{ error() }}</div>

        <form (ngSubmit)="alIniciarSesion()" class="auth-form">
          <div class="field-group">
            <label for="email">Correo electrónico</label>
            <input id="email" type="email" [(ngModel)]="email" name="email"
              placeholder="correo@ejemplo.com" required autocomplete="email" />
          </div>
          <div class="field-group">
            <label for="contrasena">Contraseña</label>
            <div class="password-wrap">
              <input id="contrasena" [type]="mostrarContrasena() ? 'text' : 'password'"
                [(ngModel)]="contrasena" name="contrasena"
                placeholder="Mínimo 6 caracteres" required />
              <button type="button" class="toggle-pass" (click)="mostrarContrasena.set(!mostrarContrasena())">
                {{ mostrarContrasena() ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>

          <a routerLink="/cambiar-contrasena" class="forgot-link">¿Olvidaste tu contraseña?</a>

          <button type="submit" class="btn btn-primary btn-full" [disabled]="cargando()">
            {{ cargando() ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>

        <div class="divider"><span>¿No tienes cuenta?</span></div>
        <a routerLink="/registro" class="btn btn-secondary btn-full">Crear cuenta nueva</a>
      </div>
    </div>
  `,
  styles: [`
    .auth-wrapper {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    }
    .auth-card {
      background: white;
      border-radius: var(--radius-2xl);
      padding: 3rem;
      width: 100%;
      max-width: 440px;
      box-shadow: var(--shadow-xl);
    }
    .auth-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 2rem;
      font-size: 1.25rem;
    }
    .brand-name { font-weight: 800; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    .subtitle { color: var(--text-muted); margin-bottom: 2rem; }
    .error-msg {
      background: #fef2f2;
      color: #ef4444;
      padding: 0.75rem 1rem;
      border-radius: var(--radius-lg);
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
      border: 1px solid #fee2e2;
    }
    .auth-form { display: flex; flex-direction: column; gap: 1.25rem; }
    .field-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .field-group label { font-weight: 600; font-size: 0.9rem; }
    .field-group input {
      padding: 0.875rem 1rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      font-size: 1rem;
      transition: var(--transition);
      outline: none;
    }
    .field-group input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
    .password-wrap { position: relative; }
    .password-wrap input { width: 100%; padding-right: 3rem; }
    .toggle-pass {
      position: absolute; right: 0.75rem; top: 50%;
      transform: translateY(-50%);
      background: none; border: none; cursor: pointer; font-size: 1.1rem;
    }
    .forgot-link { align-self: flex-end; color: var(--primary); font-size: 0.875rem; text-decoration: none; font-weight: 500; }
    .btn-full { width: 100%; padding: 0.875rem; }
    .divider {
      margin: 1.5rem 0;
      text-align: center;
      position: relative;
    }
    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0; right: 0;
      height: 1px;
      background: var(--border);
    }
    .divider span {
      background: white;
      padding: 0 1rem;
      position: relative;
      color: var(--text-muted);
      font-size: 0.875rem;
    }
  `]
})
export class LoginPaginaComponente {
  private sUsuario = inject(ServicioUsuario);
  private router = inject(Router);

  email = '';
  contrasena = '';
  error = signal('');
  cargando = signal(false);
  mostrarContrasena = signal(false);

  async alIniciarSesion() {
    if (!this.email || !this.contrasena) {
      this.error.set('Por favor completa todos los campos');
      return;
    }
    this.cargando.set(true);
    this.error.set('');
    await new Promise(r => setTimeout(r, 800));
    const ok = this.sUsuario.iniciarSesion(this.email, this.contrasena);
    this.cargando.set(false);
    if (ok) {
      this.router.navigate(['/perfil']);
    } else {
      this.error.set('Credenciales incorrectas. La contraseña necesita al menos 6 caracteres.');
    }
  }
}
