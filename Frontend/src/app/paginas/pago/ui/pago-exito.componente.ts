import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ServicioCarrito } from '../../../nucleo/servicios/carrito.servicio';
import { ServicioPago } from '../../../nucleo/servicios/pago.servicio';

/**
 * @file pago-exito.componente.ts
 * @description Pantalla final de "Pedido Recibido" tras una compra exitosa.
 * 
 * Este componente es responsable de dar feedback positivo al usuario.
 * IMPORTANTE: Recupera los datos del pedido (productos, total, ID) desde `sPago.ultimoPedido()`
 * porque el carrito se vacía justo antes de llegar aquí. Esto garantiza que el usuario
 * pueda ver su recibo inmediatamente.
 */
/**
 * Componente que muestra la confirmación de éxito tras el pago.
 */
@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="success-container">
      <div class="header-back">
        <button class="back-link" routerLink="/">🔙 Pedido recibido</button>
      </div>

      <div class="confirmation-hero">
        <div class="check-circle">✓</div>
        <h1>¡Gracias por tu compra!</h1>
        <p>Tu pedido #{{ orderId }} ha sido recibido y está siendo procesado.</p>
      </div>

      <div class="success-grid">
        <div class="main-info">
          <section class="order-summary-card">
            <h3>Detalles de tu compra</h3>
            <div class="order-items-list">
              <div class="order-item" *ngFor="let item of productosComprados">
                <div class="item-visual">
                  <img [src]="item.imagen" [alt]="item.nombre">
                </div>
                <div class="item-info">
                  <span class="name">{{ item.nombre }}</span>
                  <span class="sku">Código: {{ item.codigo }}</span>
                  <span class="price">{{ item.precio | currency }} x {{ item.cantidad }}</span>
                </div>
                <button class="btn btn-outline sm" (click)="verDetalle(item)">Ver detalles</button>
              </div>
            </div>

            <div class="mini-totals">
              <div class="row">
                <span>Subtotal:</span>
                <span>{{ totalCompra | currency }}</span>
              </div>
              <div class="row">
                <span>Envío:</span>
                <span>Gratis</span>
              </div>
              <div class="row total">
                <span>Total pagado:</span>
                <span>{{ totalCompra | currency }}</span>
              </div>
            </div>
          </section>

          <section class="support-card">
            <h3>¿Necesitas ayuda?</h3>
            <p>Si tienes alguna duda sobre tu pedido, nuestro equipo está listo para ayudarte.</p>
            <div class="support-actions">
              <button class="btn btn-outline" (click)="contacto(1)">Devoluciones</button>
              <button class="btn btn-outline" (click)="contacto(2)">Soporte técnico</button>
            </div>
          </section>
        </div>

        <aside class="sidebar-info">
          <section class="delivery-card">
            <h3>Información de entrega</h3>
            <div class="delivery-info">
              <div class="info-item">
                <span class="icon">🏠</span>
                <div class="text">
                  <strong>Dirección de envío</strong>
                  <p>{{ sPago.direccion().calle }}, {{ sPago.direccion().ciudad }}</p>
                </div>
              </div>
              <div class="info-item">
                <span class="icon">📅</span>
                <div class="text">
                  <strong>Entrega estimada</strong>
                  <p>3 - 5 días hábiles</p>
                </div>
              </div>
            </div>
          </section>

          <section class="actions-card">
            <h3>¿Listo para más?</h3>
            <p>Vuelve al catálogo para descubrir nuevas ofertas increíbles.</p>
            <button class="btn btn-primary full-width" routerLink="/">Seguir comprando</button>
          </section>

          <div class="security-badges">
             <p>Compra protegida por CompuComercio • 2026</p>
          </div>
        </aside>
      </div>
    </div>
  `,
  styles: [`
    .success-container { max-width: 900px; margin: 0 auto; padding: 2rem 1rem; }
    .back-link { background: none; border: none; font-weight: 850; cursor: pointer; font-size: 1.1rem; margin-bottom: 2rem; color: var(--text-main); }
    
    .confirmation-hero { text-align: center; margin-bottom: 3rem; }
    .check-circle { 
        width: 70px; height: 70px; background: #059669; color: white; border-radius: 50%;
        display: flex; align-items: center; justify-content: center; font-size: 2.5rem; 
        margin: 0 auto 1.5rem; box-shadow: 0 10px 15px -3px rgba(5, 150, 105, 0.3);
    }
    .confirmation-hero h1 { font-size: 2.25rem; font-weight: 850; margin-bottom: 0.5rem; }
    .confirmation-hero p { color: var(--text-muted); font-size: 1.1rem; }

    .success-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 2rem; }
    section { background: white; border: 1px solid var(--border); border-radius: var(--radius-2xl); padding: 2rem; margin-bottom: 2rem; box-shadow: var(--shadow-sm); }
    h3 { font-size: 1.15rem; font-weight: 800; margin-bottom: 1.5rem; border-left: 4px solid var(--primary); padding-left: 1rem; }

    .order-items-list { display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2rem; }
    .order-item { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--background); border-radius: var(--radius-xl); border: 1px solid var(--border); }
    .item-visual { width: 60px; height: 60px; border-radius: var(--radius-lg); overflow: hidden; background: white; flex-shrink: 0; }
    .item-visual img { width: 100%; height: 100%; object-fit: cover; }
    .item-info { flex-grow: 1; display: flex; flex-direction: column; gap: 0.1rem; }
    .item-info .name { font-weight: 700; font-size: 0.95rem; }
    .item-info .sku { font-size: 0.75rem; color: var(--text-muted); }
    .item-info .price { font-weight: 800; color: var(--primary); font-size: 0.85rem; margin-top: 0.2rem; }
    .btn.sm { padding: 0.5rem 1rem; font-size: 0.8rem; height: auto; border-radius: var(--radius-lg); }

    .mini-totals { border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
    .mini-totals .row { display: flex; justify-content: space-between; font-size: 0.95rem; }
    .mini-totals .total { font-weight: 850; font-size: 1.35rem; color: var(--text-main); margin-top: 0.5rem; padding-top: 1rem; border-top: 2px solid var(--background); }

    .support-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    
    .delivery-info { display: flex; flex-direction: column; gap: 1.5rem; }
    .info-item { display: flex; gap: 1rem; }
    .info-item .icon { font-size: 1.5rem; }
    .info-item strong { display: block; font-size: 0.9rem; margin-bottom: 0.2rem; }
    .info-item p { margin: 0; font-size: 0.85rem; color: var(--text-muted); }

    .actions-card p { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.6; }
    .full-width { width: 100%; height: 3.5rem; font-weight: 800; font-size: 1.1rem; }

    .security-badges { text-align: center; color: var(--text-muted); font-size: 0.8rem; font-weight: 600; opacity: 0.7; }

    @media (max-width: 850px) { .success-grid { grid-template-columns: 1fr; } }
  `]
})
export class ComponentePagoExito implements OnInit {
  sCarrito = inject(ServicioCarrito);
  sPago = inject(ServicioPago);
  router = inject(Router);

  orderId = Math.floor(Math.random() * 90000) + 10000;
  productosComprados: any[] = [];
  totalCompra = 0;

  ngOnInit() {
    // Establecer paso 5 para ocultar el stepper en el layout
    this.sPago.establecerPaso(5);

    // Obtenemos los datos del último pedido registrado en el servicio de pago
    const pedido = this.sPago.ultimoPedido();
    if (pedido) {
      this.orderId = pedido.id;
      this.productosComprados = pedido.productos;
      this.totalCompra = pedido.total;
    }
  }

  verDetalle(item: any) {
    this.router.navigate(['/producto', item.id]);
  }

  contacto(tipo: number) {
    alert(tipo === 1 ? 'Iniciando proceso de devolución...' : 'Conectando con un agente de soporte...');
  }
}
