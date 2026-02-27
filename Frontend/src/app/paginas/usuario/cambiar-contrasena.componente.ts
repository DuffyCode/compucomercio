import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { deslizarY } from '../../compartido/animaciones';

/**
 * @file cambiar-contrasena.componente.ts
 * @description Flujo multi-paso para recuperar o cambiar la contraseña.
 *
 * Implementa 3 pasos manejados por estado local (sin necesidad de enrutador):
 * 1. Pide el email y simula el envío de un código de verificación (el código válido es 123456).
 * 2. Formulario para definir y confirmar la nueva contraseña.
 * 3. Pantalla de éxito con botón para volver al login.
 */
@Component({
  selector: 'app-cambiar-contrasena',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  animations: [deslizarY],
  template: `
    <div class="auth-wrapper">
      <div class="auth-card" @deslizarY>
        <button type="button" class="glass-back-btn" (click)="irAtras()">
          <span class="icon">⇠</span> Volver
        </button>

        <!-- Paso 1: Código de verificación -->
        <ng-container *ngIf="paso() === 1">
          <div class="step-header">
            <div class="step-icon">📧</div>
            <h1>Cambio de contraseña</h1>
            <p>Te enviaremos un código de verificación al correo</p>
          </div>
          <div class="success-msg" *ngIf="codigoEnviado()">
            ✅ Código enviado a <strong>{{ emailIngresado }}</strong>
          </div>
          <form (ngSubmit)="alEnviarCodigo()" class="auth-form">
            <div class="field-group">
              <label>Correo electrónico</label>
              <input type="email" [(ngModel)]="emailIngresado" name="email" placeholder="correo@ejemplo.com" />
            </div>
            <div class="field-group" *ngIf="codigoEnviado()">
              <label>Código de verificación</label>
              <input type="text" [(ngModel)]="codigoIngresado" name="codigo"
                placeholder="Ej: 123456" maxlength="6" class="code-input" />
              <span class="field-hint">Código de ejemplo: <strong>123456</strong></span>
            </div>
            <button type="submit" class="btn btn-primary btn-full">
              {{ codigoEnviado() ? 'Verificar código →' : 'Enviar código' }}
            </button>
          </form>
        </ng-container>

        <!-- Paso 2: Nueva contraseña -->
        <ng-container *ngIf="paso() === 2">
          <div class="step-header">
            <div class="step-icon">🔐</div>
            <h1>Nueva contraseña</h1>
            <p>Elige una contraseña segura</p>
          </div>
          <div class="error-msg" *ngIf="error()">{{ error() }}</div>
          <form (ngSubmit)="alCambiarContrasena()" class="auth-form">
            <div class="field-group">
              <label>Nueva contraseña</label>
              <input type="password" [(ngModel)]="nuevaContrasena" name="pass1" placeholder="Mínimo 6 caracteres" />
            </div>
            <div class="field-group">
              <label>Confirmar nueva contraseña</label>
              <input type="password" [(ngModel)]="confirmarContrasena" name="pass2" placeholder="Repite la contraseña" />
            </div>
            <button type="submit" class="btn btn-primary btn-full">Cambiar contraseña</button>
          </form>
        </ng-container>

        <!-- Paso 3: Éxito -->
        <ng-container *ngIf="paso() === 3">
          <div class="success-state">
            <div class="success-icon">✅</div>
            <h2>¡Contraseña actualizada!</h2>
            <p>Tu contraseña ha sido cambiada exitosamente.</p>
            <a routerLink="/login" class="btn btn-primary" style="margin-top:2rem">Iniciar sesión</a>
          </div>
        </ng-container>

        <!-- Indicadores de paso -->
        <div class="step-dots" *ngIf="paso() < 3">
          <span [class.active]="paso() >= 1" class="dot"></span>
          <span [class.active]="paso() >= 2" class="dot"></span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-wrapper {
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
      padding: 2rem; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    }
    .auth-card { background: white; border-radius: var(--radius-2xl); padding: 3rem; width: 100%; max-width: 440px; box-shadow: var(--shadow-xl); position: relative; }
    .glass-back-btn {
      position: absolute; top: 1.5rem; left: 1.5rem;
      background: rgba(99, 102, 241, 0.05); color: var(--primary);
      border: 1px solid rgba(99, 102, 241, 0.1); padding: 0.5rem 1rem;
      border-radius: var(--radius-lg); font-size: 0.875rem; font-weight: 600;
      cursor: pointer; display: flex; align-items: center; gap: 0.5rem;
      transition: var(--transition); z-index: 10;
    }
    .glass-back-btn:hover { background: var(--primary); color: white; transform: translateX(-4px); }
    .glass-back-btn .icon { font-size: 1.2rem; line-height: 1; }
    .step-header { text-align: center; margin-bottom: 2rem; margin-top: 1rem; }
    .step-icon { font-size: 3rem; margin-bottom: 1rem; }
    h1 { font-size: 1.75rem; margin-bottom: 0.5rem; }
    .step-header p { color: var(--text-muted); }
    .success-msg { background: #f0fdf4; color: #16a34a; padding: 0.75rem 1rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem; font-size: 0.9rem; border: 1px solid #bbf7d0; }
    .error-msg { background: #fef2f2; color: #ef4444; padding: 0.75rem 1rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem; font-size: 0.9rem; border: 1px solid #fee2e2; }
    .auth-form { display: flex; flex-direction: column; gap: 1.25rem; }
    .field-group { display: flex; flex-direction: column; gap: 0.4rem; }
    .field-group label { font-weight: 600; font-size: 0.875rem; }
    .field-group input {
      padding: 0.875rem 1rem; border: 1px solid var(--border);
      border-radius: var(--radius-lg); font-size: 1rem; outline: none;
      transition: var(--transition);
    }
    .field-group input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
    .code-input { letter-spacing: 0.3em; font-size: 1.25rem; text-align: center; font-weight: 700; }
    .field-hint { font-size: 0.8rem; color: var(--text-muted); }
    .btn-full { width: 100%; padding: 0.875rem; }
    .step-dots { display: flex; justify-content: center; gap: 0.5rem; margin-top: 2rem; }
    .dot { width: 10px; height: 10px; border-radius: 50%; background: var(--border); transition: var(--transition); }
    .dot.active { background: var(--primary); }
    .success-state { text-align: center; padding: 1rem 0; }
    .success-icon { font-size: 4rem; margin-bottom: 1rem; display: block; }
  `]
})
export class CambiarContrasenaPaginaComponente {
  private location = inject(Location);

  paso = signal(1);
  codigoEnviado = signal(false);
  error = signal('');

  emailIngresado = '';
  codigoIngresado = '';
  nuevaContrasena = '';
  confirmarContrasena = '';

  irAtras() {
    this.location.back();
  }

  alEnviarCodigo() {
    if (!this.codigoEnviado()) {
      if (!this.emailIngresado) return;
      this.codigoEnviado.set(true);
    } else {
      if (this.codigoIngresado === '123456') {
        this.paso.set(2);
      } else {
        this.error.set('Código incorrecto. Usa el código de ejemplo: 123456');
      }
    }
  }

  alCambiarContrasena() {
    this.error.set('');
    if (!this.nuevaContrasena || this.nuevaContrasena.length < 6) {
      this.error.set('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.error.set('Las contraseñas no coinciden');
      return;
    }
    this.paso.set(3);
  }
}
