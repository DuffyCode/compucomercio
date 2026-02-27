import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServicioCarrito } from '../../../nucleo/servicios/carrito.servicio';
import { ServicioPago } from '../../../nucleo/servicios/pago.servicio';

/**
 * Componente que muestra el resumen inicial antes de proceder al pago.
 */
@Component({
  selector: 'app-checkout-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="step-container">
      <section class="order-preview">
        <h3>Tu Pedido</h3>
        <p>Revisa los artículos que estás a punto de comprar.</p>
        <div class="mini-cart">
          <div class="cart-item" *ngFor="let item of sCarrito.articulosActivos()">
            <div class="item-visual">
                <img [src]="item.imagen" [alt]="item.nombre" style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit;">
            </div>
            <div class="item-info">
              <span class="name">{{ item.nombre }}</span>
              <span class="sku">SKU {{ item.codigo }}</span>
              <span class="item-price">{{ item.precio | currency }} x {{ item.cantidad }}</span>
            </div>
          </div>
        </div>
        
        <div class="totals-preview">
          <div class="row">
            <span>Subtotal:</span>
            <span>{{ sCarrito.subtotal() | currency }}</span>
          </div>
          <div class="row">
            <span>Envío:</span>
            <span>A calcular en el siguiente paso</span>
          </div>
          <div class="row total">
            <span>Total Parcial</span>
            <span>{{ sCarrito.subtotal() | currency }}</span>
          </div>
        </div>

        <div class="footer-actions">
           <button class="btn btn-primary full-width" (click)="alSiguientePaso()">Empezar proceso de envío</button>
           <button class="btn btn-outline full-width" style="margin-top: 1rem; border-color: #cbd5e1; color: #64748b;" (click)="alRegresarAlCarrito()">Volver al carrito</button>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .step-container { max-width: 600px; margin: 0 auto; }
    h3 { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    p { color: var(--text-muted); margin-bottom: 2rem; }
    section { padding: 2.5rem; border: 1px solid var(--border); border-radius: var(--radius-2xl); background: white; box-shadow: var(--shadow-sm); }
    
    .mini-cart { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); }
    .cart-item { display: flex; gap: 1.25rem; align-items: center; }
    .item-visual { 
      width: 60px; height: 60px; background: var(--background); 
      border: 1px solid var(--border); border-radius: var(--radius-lg);
      overflow: hidden; flex-shrink: 0;
    }
    .item-info { display: flex; flex-direction: column; gap: 0.1rem; }
    .item-info .name { font-weight: 700; color: var(--text-main); font-size: 0.95rem; }
    .item-info .sku { font-size: 0.75rem; color: var(--text-muted); }
    .item-price { font-weight: 700; color: var(--primary); font-size: 0.85rem; margin-top: 0.2rem; }

    .totals-preview { border-top: 1px solid var(--border); padding-top: 1.5rem; margin-bottom: 2rem; }
    .row { display: flex; justify-content: space-between; font-size: 0.95rem; margin-bottom: 0.75rem; }
    .row.total { font-weight: 800; font-size: 1.25rem; color: var(--text-main); margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--background); }
    
    .full-width { width: 100%; height: 3.5rem; font-weight: 800; font-size: 1.1rem; border-radius: var(--radius-xl); }
    .footer-actions { margin-top: 1rem; }
  `]
})
export class ComponenteResumenPago implements OnInit {
  sCarrito = inject(ServicioCarrito);
  sPago = inject(ServicioPago);
  router = inject(Router);

  ngOnInit() {
    this.sPago.establecerPaso(1);
  }

  alSiguientePaso() {
    this.router.navigate(['/pago/direccion']);
  }

  alRegresarAlCarrito() {
    this.router.navigate(['/carrito']);
  }
}
