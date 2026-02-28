import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServicioPago } from '../../../nucleo/servicios/pago.servicio';

@Component({
  selector: 'app-pago-direccion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="step-container">
      <div class="form-card">
        <div class="header">
          <span class="step-badge">Paso 2 de 4</span>
          <h3>Dirección de envío</h3>
          <p>¿Dónde enviamos tu pedido?</p>
        </div>

        <form (ngSubmit)="continuar()" class="address-form">
          <div class="field-group full">
            <label>Nombre completo</label>
            <input type="text" [(ngModel)]="dir.nombre" name="nombre" placeholder="Ej: José Cadenas" (input)="filtrarNombre($event)" required />
          </div>

          <div class="two-cols">
            <div class="field-group">
              <label>País</label>
              <select [(ngModel)]="dir.pais" name="pais">
                <option value="México">México</option>
                <option value="España">España</option>
                <option value="Colombia">Colombia</option>
                <option value="Argentina">Argentina</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div class="field-group">
              <label>Código Postal</label>
              <input type="text" [(ngModel)]="dir.codigoPostal" name="cp" placeholder="00000" (input)="filtrarSoloNumeros($event, 'codigoPostal')" />
            </div>
          </div>

          <div class="field-group full">
            <label>Calle y número</label>
            <input type="text" [(ngModel)]="dir.calle" name="calle" placeholder="Nombre de calle, número de casa, apto..." />
          </div>

          <div class="two-cols">
            <div class="field-group">
              <label>Ciudad</label>
              <input type="text" [(ngModel)]="dir.ciudad" name="ciudad" placeholder="Ej: Madrid" />
            </div>
            <div class="field-group">
              <label>Estado / Provincia</label>
              <input type="text" [(ngModel)]="dir.estado" name="estado" placeholder="Ej: Madrid" />
            </div>
          </div>

          <div class="field-group full">
            <label>Teléfono de contacto</label>
            <input type="tel" [(ngModel)]="dir.telefono" name="tel" placeholder="+34 000 000 000" (input)="filtrarSoloNumeros($event, 'telefono')" />
            <span class="hint">Para coordinar la entrega si es necesario</span>
          </div>

          <div class="actions">
            <button type="button" class="btn btn-outline" (click)="volver()">Atrás</button>
            <button type="submit" class="btn btn-primary" [disabled]="!formularioValido()">Continuar al pago</button>
          </div>
        </form>
      </div>

      <div class="security-note">
        <span class="icon">🔒</span>
        <p>Tus datos están protegidos por encriptación de grado bancario.</p>
      </div>
    </div>
  `,
  styles: [`
    .step-container { max-width: 600px; margin: 0 auto; padding-bottom: 3rem; }
    .form-card {
      background: white;
      border: 1px solid var(--border);
      border-radius: var(--radius-2xl);
      padding: 2.5rem;
      box-shadow: var(--shadow-xl);
    }
    .header { margin-bottom: 2.5rem; }
    .step-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: var(--primary-light);
      color: var(--primary);
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    h3 { font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem; }
    p { color: var(--text-muted); font-size: 0.95rem; }

    .address-form { display: flex; flex-direction: column; gap: 1.5rem; }
    .field-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .two-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    
    label { font-size: 0.875rem; font-weight: 700; color: var(--text-main); }
    input, select {
      padding: 0.875rem 1.25rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      font-size: 1rem;
      outline: none;
      transition: var(--transition);
      background: #f8fafc;
    }
    input:focus, select:focus {
      background: white;
      border-color: var(--primary);
      box-shadow: 0 0 0 4px var(--primary-light);
    }
    .hint { font-size: 0.75rem; color: var(--text-muted); }

    .actions {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .btn { padding: 1rem; font-weight: 700; }

    .security-note {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-top: 2rem;
      color: var(--text-muted);
      font-size: 0.85rem;
    }
    .security-note .icon { font-size: 1.25rem; }

    @media (max-width: 500px) {
      .two-cols { grid-template-columns: 1fr; gap: 1.5rem; }
    }
  `]
})
export class ComponentePagoDireccion implements OnInit {
  sPago = inject(ServicioPago);
  router = inject(Router);

  dir = {
    nombre: '',
    pais: 'España',
    calle: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
    telefono: ''
  };

  ngOnInit() {
    this.sPago.establecerPaso(2);
    const actual = this.sPago.direccion();
    if (actual.nombre) {
      this.dir = { ...actual };
    }
  }

  filtrarNombre(ev: any) {
    const v = ev.target.value.replace(/[^a-zA-Z\sñÑáéíóúÁÉÍÓÚ]/g, '');
    this.dir.nombre = v;
    ev.target.value = v;
  }

  filtrarSoloNumeros(ev: any, campo: 'codigoPostal' | 'telefono') {
    const v = ev.target.value.replace(/\D/g, '');
    this.dir[campo] = v;
    ev.target.value = v;
  }

  formularioValido(): boolean {
    return this.dir.nombre.length >= 3 &&
      this.dir.codigoPostal.length >= 4 &&
      this.dir.telefono.length >= 7 &&
      this.dir.calle.length >= 5 &&
      this.dir.ciudad.length >= 2;
  }

  volver() {
    this.router.navigate(['/pago/paso-1']);
  }

  continuar() {
    this.sPago.actualizarDireccion(this.dir);
    this.router.navigate(['/pago/tarjeta']);
  }
}
