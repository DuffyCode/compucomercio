import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServicioUsuario } from '../../nucleo/servicios/usuario.servicio';
import { deslizarY } from '../../compartido/animaciones';

/**
 * @file registro-pagina.componente.ts
 * @description Página para crear una nueva cuenta de usuario.
 *
 * Presenta un formulario completo con validaciones básicas de campos obligatorios
 * y coincidencia de contraseñas. Al completar el registro exitosamente a través
 * de `ServicioUsuario`, muestra un mensaje de éxito y redirige automáticamente
 * al perfil del usuario recién creado.
 */
@Component({
  selector: 'app-registro-pagina',
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
        <h1>Crear cuenta</h1>
        <p class="subtitle">Completa tus datos para registrarte</p>

        <div class="error-msg" *ngIf="error()">{{ error() }}</div>
        <div class="success-msg" *ngIf="exito()">{{ exito() }}</div>

        <form (ngSubmit)="alRegistrar()" class="auth-form">
          <!-- Contraseña -->
          <div class="section-label">Seguridad</div>
          <div class="two-col">
            <div class="field-group">
              <label for="contrasena">Contraseña</label>
              <input id="contrasena" type="password" [(ngModel)]="form.contrasena" name="contrasena" placeholder="Mínimo 6 caracteres" />
            </div>
            <div class="field-group">
              <label for="confirmar">Confirmar contraseña</label>
              <input id="confirmar" type="password" [(ngModel)]="form.confirmar" name="confirmar" placeholder="Repite la contraseña" />
            </div>
          </div>

          <!-- Datos personales -->
          <div class="section-label">Datos de usuario</div>
          <div class="two-col">
            <div class="field-group">
              <label for="nombre">Nombre</label>
              <input id="nombre" type="text" [(ngModel)]="form.nombre" name="nombre" placeholder="José" (input)="filtrarSoloLetras($event, 'nombre')" />
            </div>
            <div class="field-group">
              <label for="apellido">Apellido</label>
              <input id="apellido" type="text" [(ngModel)]="form.apellido" name="apellido" placeholder="García" (input)="filtrarSoloLetras($event, 'apellido')" />
            </div>
          </div>
          <div class="two-col">
            <div class="field-group">
              <label for="email">Correo electrónico</label>
              <input id="email" type="email" [(ngModel)]="form.email" name="email" placeholder="correo@ejemplo.com" />
            </div>
            <div class="field-group">
              <label for="telefono">Teléfono</label>
              <input id="telefono" type="tel" [(ngModel)]="form.telefono" name="telefono" placeholder="+1 (555) 000-0000" (input)="filtrarSoloNumeros($event, 'telefono')" />
            </div>
          </div>
          <div class="field-group">
            <label for="genero">Género</label>
            <select id="genero" [(ngModel)]="form.genero" name="genero">
              <option value="">Seleccionar...</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
              <option value="Prefiero no decir">Prefiero no decir</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary btn-full" [disabled]="cargando()">
            {{ cargando() ? 'Registrando...' : 'Crear cuenta' }}
          </button>
        </form>

        <div class="divider"><span>¿Ya tienes cuenta?</span></div>
        <a routerLink="/login" class="btn btn-secondary btn-full">Iniciar sesión</a>
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
      max-width: 560px;
      box-shadow: var(--shadow-xl);
    }
    .auth-brand { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem; font-size: 1.25rem; }
    .brand-name { font-weight: 800; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    .subtitle { color: var(--text-muted); margin-bottom: 2rem; }
    .error-msg {
      background: #fef2f2; color: #ef4444;
      padding: 0.75rem 1rem; border-radius: var(--radius-lg); margin-bottom: 1rem;
      font-size: 0.9rem; border: 1px solid #fee2e2;
    }
    .success-msg {
      background: #f0fdf4; color: #16a34a;
      padding: 0.75rem 1rem; border-radius: var(--radius-lg); margin-bottom: 1rem;
      font-size: 0.9rem; border: 1px solid #bbf7d0;
    }
    .auth-form { display: flex; flex-direction: column; gap: 1rem; }
    .section-label {
      font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.1em; color: var(--text-muted); margin-top: 0.5rem;
    }
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .field-group { display: flex; flex-direction: column; gap: 0.4rem; }
    .field-group label { font-weight: 600; font-size: 0.875rem; }
    .field-group input, .field-group select {
      padding: 0.75rem 1rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      font-size: 0.95rem;
      transition: var(--transition);
      outline: none;
      background: white;
    }
    .field-group input:focus, .field-group select:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
    }
    .btn-full { width: 100%; padding: 0.875rem; margin-top: 0.5rem; }
    .divider {
      margin: 1.5rem 0; text-align: center; position: relative;
    }
    .divider::before {
      content: ''; position: absolute; top: 50%; left: 0; right: 0;
      height: 1px; background: var(--border);
    }
    .divider span {
      background: white; padding: 0 1rem; position: relative;
      color: var(--text-muted); font-size: 0.875rem;
    }
    @media (max-width: 500px) { .two-col { grid-template-columns: 1fr; } }
  `]
})
export class RegistroPaginaComponente {
  private sUsuario = inject(ServicioUsuario);
  private router = inject(Router);

  form = { nombre: '', apellido: '', email: '', telefono: '', genero: '', contrasena: '', confirmar: '' };
  error = signal('');
  exito = signal('');
  cargando = signal(false);

  async alRegistrar() {
    const { nombre, apellido, email, telefono, genero, contrasena, confirmar } = this.form;
    if (!nombre || !apellido || !email || !contrasena) {
      this.error.set('Por favor completa todos los campos obligatorios');
      return;
    }
    if (contrasena !== confirmar) {
      this.error.set('Las contraseñas no coinciden');
      return;
    }
    if (contrasena.length < 6) {
      this.error.set('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    this.cargando.set(true);
    this.error.set('');
    await new Promise(r => setTimeout(r, 1000));
    this.sUsuario.registrar({ nombre, apellido, email, telefono, genero });
    this.cargando.set(false);
    this.exito.set('¡Cuenta creada exitosamente! Redirigiendo...');
    setTimeout(() => this.router.navigate(['/perfil']), 1500);
  }

  filtrarSoloLetras(event: any, campo: keyof typeof this.form) {
    const val = event.target.value;
    const filtrado = val.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    if (val !== filtrado) {
      this.form[campo] = filtrado;
      event.target.value = filtrado;
    }
  }

  filtrarSoloNumeros(event: any, campo: keyof typeof this.form) {
    const val = event.target.value;
    const filtrado = val.replace(/\D/g, '');
    if (val !== filtrado) {
      this.form[campo] = filtrado;
      event.target.value = filtrado;
    }
  }
}
