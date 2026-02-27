import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServicioUsuario } from '../../nucleo/servicios/usuario.servicio';
import { deslizarY } from '../../compartido/animaciones';

/**
 * @file perfil-editar.componente.ts
 * @description Formulario para modificar los datos personales del usuario.
 *
 * Inicializa los campos del formulario con los datos actuales de la
 * sesión activa. Al guardar, llama a `actualizarPerfil` en el
 * `ServicioUsuario` y, tras mostrar un mensaje de éxito, redirige
 * de vuelta a la página principal del perfil.
 */
@Component({
  selector: 'app-perfil-editar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  animations: [deslizarY],
  template: `
    <div class="edit-wrapper" @deslizarY>
      <div class="edit-header">
        <a routerLink="/perfil" class="back-profile-pill">
           <span class="icon">👤</span> Volver al perfil
        </a>
        <h1>Editar perfil</h1>
      </div>

      <div class="edit-card">
        <div class="success-msg" *ngIf="exito()">{{ exito() }}</div>
        <form (ngSubmit)="alGuardar()" class="edit-form">
          <div class="two-col">
            <div class="field-group">
              <label>Nombre</label>
              <input type="text" [(ngModel)]="form.nombre" name="nombre" (input)="filtrarSoloLetras($event, 'nombre')" />
            </div>
            <div class="field-group">
              <label>Apellido</label>
              <input type="text" [(ngModel)]="form.apellido" name="apellido" (input)="filtrarSoloLetras($event, 'apellido')" />
            </div>
          </div>
          <div class="two-col">
            <div class="field-group">
              <label>Correo electrónico</label>
              <input type="email" [(ngModel)]="form.email" name="email" />
            </div>
            <div class="field-group">
              <label>Teléfono</label>
              <input type="tel" [(ngModel)]="form.telefono" name="telefono" (input)="filtrarSoloNumeros($event, 'telefono')" />
            </div>
          </div>
          <div class="field-group">
            <label>Género</label>
            <select [(ngModel)]="form.genero" name="genero">
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
              <option value="Prefiero no decir">Prefiero no decir</option>
            </select>
          </div>
          <div class="form-actions">
            <a routerLink="/perfil" class="btn btn-secondary">Cancelar</a>
            <button type="submit" class="btn btn-primary" [disabled]="cargando()">
              {{ cargando() ? 'Guardando...' : 'Guardar cambios' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .edit-wrapper { max-width: 600px; margin: 0 auto; padding: 2rem 1rem 4rem; }
    .edit-header { margin-bottom: 2.5rem; }
    .back-profile-pill {
      display: inline-flex; align-items: center; gap: 0.75rem;
      padding: 0.6rem 1.25rem; background: white; border: 1px solid var(--border);
      border-radius: 999px; font-weight: 700; color: var(--text-main);
      text-decoration: none; font-size: 0.85rem; margin-bottom: 1.5rem;
      transition: var(--transition); box-shadow: var(--shadow-sm);
    }
    .back-profile-pill:hover {
      background: var(--primary); color: white; border-color: var(--primary);
      transform: translateY(-2px); box-shadow: var(--shadow-md);
    }
    .back-profile-pill .icon { font-size: 1rem; }
    h1 { font-size: 2.5rem; font-weight: 900; letter-spacing: -0.02em; }
    .edit-card { background: white; border-radius: var(--radius-2xl); padding: 2.5rem; box-shadow: var(--shadow-md); }
    .success-msg { background: #f0fdf4; color: #16a34a; padding: 0.75rem 1rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem; font-size: 0.9rem; border: 1px solid #bbf7d0; }
    .edit-form { display: flex; flex-direction: column; gap: 1.25rem; }
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .field-group { display: flex; flex-direction: column; gap: 0.4rem; }
    .field-group label { font-weight: 600; font-size: 0.875rem; }
    .field-group input, .field-group select {
      padding: 0.75rem 1rem; border: 1px solid var(--border);
      border-radius: var(--radius-lg); font-size: 0.95rem;
      transition: var(--transition); outline: none; background: white;
    }
    .field-group input:focus, .field-group select:focus {
      border-color: var(--primary); box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
    }
    .form-actions { display: flex; gap: 1rem; justify-content: flex-end; margin-top: 0.5rem; }
    @media (max-width: 480px) { .two-col { grid-template-columns: 1fr; } }
  `]
})
export class PerfilEditarComponente {
  private sUsuario = inject(ServicioUsuario);
  private router = inject(Router);

  exito = signal('');
  cargando = signal(false);

  form = {
    nombre: this.sUsuario.sesionActiva()?.nombre ?? '',
    apellido: this.sUsuario.sesionActiva()?.apellido ?? '',
    email: this.sUsuario.sesionActiva()?.email ?? '',
    telefono: this.sUsuario.sesionActiva()?.telefono ?? '',
    genero: this.sUsuario.sesionActiva()?.genero ?? ''
  };

  async alGuardar() {
    this.cargando.set(true);
    await new Promise(r => setTimeout(r, 800));
    this.sUsuario.actualizarPerfil(this.form);
    this.cargando.set(false);
    this.exito.set('✅ Cambios guardados correctamente');
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
