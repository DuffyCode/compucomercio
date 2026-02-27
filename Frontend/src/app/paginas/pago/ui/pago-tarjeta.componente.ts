import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServicioPago } from '../../../nucleo/servicios/pago.servicio';

@Component({
  selector: 'app-pago-tarjeta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="step-container">
      <div class="form-card">
        <div class="header">
          <span class="step-badge">Paso 3 de 4</span>
          <h3>Método de pago</h3>
          <p>Introduce los datos de tu tarjeta de forma segura</p>
        </div>

        <div class="card-preview" [class.visa]="tipoTarjeta() === 'visa'" [class.mastercard]="tipoTarjeta() === 'mastercard'">
          <div class="card-chip"></div>
          <div class="card-number">{{ numeroFormateado() || '•••• •••• •••• ••••' }}</div>
          <div class="card-bottom">
            <div class="card-holder">
              <span class="label">TITULAR</span>
              <span class="value">{{ titular || 'NOMBRE DEL TITULAR' }}</span>
            </div>
            <div class="card-expiry">
              <span class="label">EXPIRA</span>
              <span class="value">{{ vencimiento || 'MM/AA' }}</span>
            </div>
            <div class="card-type" *ngIf="tipoTarjeta()">
              {{ tipoTarjeta() === 'visa' ? 'VISA' : 'Mastercard' }}
            </div>
          </div>
        </div>

        <form (ngSubmit)="formularioValido() && continuar()" class="card-form">
          <div class="field-group full">
            <label>Número de tarjeta</label>
            <input type="text" [(ngModel)]="numero" name="num" 
              placeholder="0000 0000 0000 0000" maxlength="19" 
              (input)="formatearNumero($event)" />
          </div>

          <div class="field-group full">
            <label>Nombre del titular</label>
            <input type="text" [(ngModel)]="titular" name="name" 
              placeholder="Como aparece en la tarjeta" 
              (input)="validarSoloLetras($event)" />
          </div>

          <div class="two-cols">
            <div class="field-group">
              <label>Fecha de vencimiento</label>
              <input type="text" [(ngModel)]="vencimiento" name="expiry" 
                placeholder="MM/AA" maxlength="5" 
                (input)="formatearVencimiento($event)" />
            </div>
            <div class="field-group">
              <label>CVC / CVV</label>
              <input type="password" [(ngModel)]="cvv" name="cvv" 
                placeholder="123" maxlength="4" 
                (input)="validarSoloNumeros($event)" />
            </div>
          </div>

          <div class="actions">
            <button type="button" class="btn btn-outline" (click)="volver()">Atrás</button>
            <button type="submit" class="btn btn-primary" [disabled]="!formularioValido()">Revisar pedido</button>
          </div>
        </form>
      </div>

      <div class="security-footer">
         <div class="pci-badge">🛡️ Seguridad PCI-DSS Certificada</div>
         <div class="brands">
            <span>VISA</span>
            <span>Mastercard</span>
            <span>American Express</span>
         </div>
      </div>
    </div>
  `,
  styles: [`
    .step-container { max-width: 600px; margin: 0 auto; padding-bottom: 4rem; }
    .form-card {
      background: white; border: 1px solid var(--border);
      border-radius: var(--radius-2xl); padding: 2.5rem;
      box-shadow: var(--shadow-xl);
    }
    .header { margin-bottom: 2rem; }
    .step-badge {
      display: inline-block; padding: 0.25rem 0.75rem;
      background: var(--primary-light); color: var(--primary);
      border-radius: 999px; font-size: 0.75rem; font-weight: 700; margin-bottom: 1rem;
    }
    h3 { font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem; }
    
    .card-preview {
      aspect-ratio: 1.586; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border-radius: var(--radius-xl); padding: 1.5rem; color: white;
      margin-bottom: 2.5rem; position: relative; display: flex; flex-direction: column;
      justify-content: space-between; box-shadow: 0 10px 20px rgba(0,0,0,0.15); transition: 0.5s ease;
    }
    .card-preview.visa { background: linear-gradient(135deg, #1a1aff 0%, #000066 100%); }
    .card-preview.mastercard { background: linear-gradient(135deg, #eb001b 0%, #ff5f00 100%); }
    
    .card-chip {
      width: 44px; height: 34px; background: linear-gradient(135deg, #d4d4d8 0%, #71717a 100%);
      border-radius: 6px; margin-bottom: 1rem;
    }
    .card-number { font-size: 1.5rem; letter-spacing: 0.15em; font-family: 'Courier New', monospace; font-weight: 700; }
    .card-bottom { display: flex; justify-content: space-between; align-items: flex-end; }
    .label { display: block; font-size: 0.6rem; opacity: 0.6; margin-bottom: 0.2rem; }
    .value { font-size: 0.85rem; font-weight: 600; text-transform: uppercase; }
    .card-type { font-weight: 900; font-style: italic; font-size: 1.1rem; }

    .card-form { display: flex; flex-direction: column; gap: 1.25rem; }
    .field-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .full { grid-column: span 2; }
    .two-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
    
    label { font-size: 0.85rem; font-weight: 700; }
    input {
      padding: 0.875rem 1.25rem; border: 1px solid var(--border);
      border-radius: var(--radius-xl); font-size: 1rem; outline: none; transition: var(--transition);
    }
    input:focus { border-color: var(--primary); box-shadow: 0 0 0 4px var(--primary-light); }

    .actions { display: grid; grid-template-columns: 1fr 2fr; gap: 1rem; margin-top: 1.5rem; }
    .btn { padding: 1rem; font-weight: 700; }

    .security-footer { margin-top: 2rem; text-align: center; display: flex; flex-direction: column; gap: 1rem; }
    .pci-badge { font-size: 0.8rem; font-weight: 700; color: #16a34a; }
    .brands { font-size: 0.75rem; color: var(--text-muted); display: flex; gap: 1rem; justify-content: center; font-weight: 800; }
  `]
})
export class ComponentePagoTarjeta implements OnInit {
  sPago = inject(ServicioPago);
  router = inject(Router);

  numero = '';
  titular = '';
  vencimiento = '';
  cvv = '';

  ngOnInit() {
    this.sPago.establecerPaso(3);
  }

  formatearNumero(ev: any) {
    let raw = ev.target.value.replace(/\D/g, '');
    let formatted = raw.match(/.{1,4}/g)?.join(' ') || '';
    this.numero = formatted.substring(0, 19);
    ev.target.value = this.numero;
  }

  formatearVencimiento(ev: any) {
    let raw = ev.target.value.replace(/\D/g, '');
    let v = '';
    if (raw.length >= 2) {
      v = raw.substring(0, 2) + '/' + raw.substring(2, 4);
    } else {
      v = raw;
    }
    this.vencimiento = v;
    ev.target.value = v;
  }

  numeroFormateado() { return this.numero; }

  tipoTarjeta() {
    if (this.numero.startsWith('4')) return 'visa';
    if (this.numero.startsWith('5')) return 'mastercard';
    return null;
  }

  validarSoloLetras(ev: any) {
    const v = ev.target.value.replace(/[^a-zA-Z\s]/g, '');
    this.titular = v;
    ev.target.value = v;
  }

  validarSoloNumeros(ev: any) {
    const v = ev.target.value.replace(/\D/g, '');
    this.cvv = v;
    ev.target.value = v;
  }

  formularioValido(): boolean {
    const numOk = this.numero.replace(/\s/g, '').length >= 15;
    const titularOk = this.titular.length > 3;
    const vencimientoOk = /^\d{2}\/\d{2}$/.test(this.vencimiento);
    const cvvOk = this.cvv.length >= 3;
    return numOk && titularOk && vencimientoOk && cvvOk;
  }

  volver() { this.router.navigate(['/pago/direccion']); }
  continuar() { this.router.navigate(['/pago/confirmar']); }
}
