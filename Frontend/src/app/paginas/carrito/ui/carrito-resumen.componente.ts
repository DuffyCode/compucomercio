import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicioCarrito } from '../../../nucleo/servicios/carrito.servicio';

/**
 * Componente que muestra el resumen de costos del carrito.
 */
@Component({
  selector: 'app-resumen-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="summary-card">
      <div class="summary-rows">
        <div class="row">
          <span>Subtotal</span>
          <span>{{ sCarrito.subtotal() | currency }}</span>
        </div>
        <div class="row">
          <div class="shipping-label">
            <span>Envío</span>
            <span class="badge">Envío estándar: 0.00</span>
          </div>
          <span>{{ sCarrito.envio() | currency }}</span>
        </div>
        <div class="row">
          <span>Impuestos estimados</span>
          <span>{{ sCarrito.impuesto() | currency }}</span>
        </div>
      </div>

      <div class="total-row">
        <span>Total</span>
        <span class="total-amount">{{ sCarrito.totalTotal() | currency }}</span>
      </div>

      <div class="actions">
        <button class="btn btn-primary checkout-btn" routerLink="/pago" [disabled]="sCarrito.totalProductos() === 0">Ir a pagar</button>
        <button class="btn btn-secondary continue-btn" routerLink="/">Seguir comprando</button>
      </div>
    </div>
  `,
  styles: [`
    .summary-card {
      background: #f8fafc;
      padding: 2rem;
      border-radius: var(--radius-xl);
      border: 1px solid var(--border);
      position: sticky;
      top: 100px;
    }

    .summary-rows {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--border);
    }

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.95rem;
      color: var(--text-main);
    }

    .shipping-label {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .badge {
      font-size: 0.75rem;
      background: white;
      border: 1px solid var(--border);
      padding: 0.125rem 0.5rem;
      border-radius: 4px;
      color: var(--text-muted);
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 0;
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--text-main);
    }

    .total-amount {
      font-size: 1.5rem;
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .checkout-btn {
      width: 100%;
      padding: 1rem;
      background: #000;
      color: #fff;
      border-radius: 8px;
    }

    .continue-btn {
      width: 100%;
      background: transparent;
      border: none;
      color: var(--text-main);
      text-decoration: underline;
    }
  `]
})
export class ComponenteResumenCarrito {
  sCarrito = inject(ServicioCarrito);
}
