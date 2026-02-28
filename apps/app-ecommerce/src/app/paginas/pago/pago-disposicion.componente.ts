import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ServicioPago } from '../../nucleo/servicios/pago.servicio';

/**
 * @file pago-disposicion.componente.ts
 * @description Layout (shell) del flujo de checkout / pago.
 *
 * Este componente actúa como ruta padre de `/pago`. Su responsabilidad es
 * mostrar el encabezado de checkout con el logotipo y el **stepper de 4 pasos**,
 * y dejar que el `<router-outlet>` cargue el sub-componente del paso activo.
 *
 * El paso activo se determina con `ServicioPago.pasoActual()` y se actualiza
 * cada vez que el usuario navega a una sub-ruta del checkout:
 * 1. `/pago/paso-1`   → Resumen del pedido
 * 2. `/pago/direccion` → Dirección de envío
 * 3. `/pago/tarjeta`   → Método de pago
 * 4. `/pago/confirmar` → Confirmación final
 */
@Component({
  selector: 'app-disposicion-pago',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="checkout-wrapper">
      <header class="checkout-header">
        <h2 class="brand">CompuComercio ▾</h2>
        
        <nav class="stepper" *ngIf="sPago.pasoActual() < 5">
          <div class="step" [class.active]="sPago.pasoActual() === 1">
            <span class="num">1</span>
            <span class="label">Pedido</span>
          </div>
          <div class="divider"></div>
          <div class="step" [class.active]="sPago.pasoActual() === 2">
            <span class="num">2</span>
            <span class="label">Envío</span>
          </div>
          <div class="divider"></div>
          <div class="step" [class.active]="sPago.pasoActual() === 3">
            <span class="num">3</span>
            <span class="label">Pago</span>
          </div>
          <div class="divider"></div>
          <div class="step" [class.active]="sPago.pasoActual() === 4">
            <span class="num">4</span>
            <span class="label">Confirmar</span>
          </div>
        </nav>
      </header>

      <main class="checkout-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .checkout-wrapper {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1rem;
      min-height: 100vh;
    }

    .checkout-header {
      margin-bottom: 2.5rem;
    }

    .brand {
      font-size: 1.5rem;
      font-weight: 800;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .stepper {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: var(--text-muted);
      font-size: 0.9rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border);
    }

    .step {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: default;
      font-weight: 500;
      transition: var(--transition);
    }

    .step.active {
      color: var(--text-main);
      font-weight: 700;
    }

    .step .num {
      font-weight: 800;
    }

    .active-link {
      border-bottom: 2px solid black;
      margin-bottom: -1.1rem;
      padding-bottom: 1rem;
    }

    .divider {
      height: 1px;
      width: 30px;
      background: var(--border);
    }

    .checkout-content {
      animation: fadeIn 0.4s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ComponenteDisposicionPago {
  sPago = inject(ServicioPago);
}
