import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioCarrito } from '../../../nucleo/servicios/carrito.servicio';
import { Router } from '@angular/router';
import { Producto } from '../../../nucleo/datos-productos';

@Component({
  selector: 'app-informacion-producto',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-info-container">
      <nav class="breadcrumb">{{ producto.categoria }} > {{ producto.marca }}</nav>
      <h1 class="product-title">{{ producto.nombre }}</h1>
      <span class="product-code">REFERENCIA: {{ producto.codigo }}</span>
      
      <div class="price-section">
        <div class="prices">
          <span class="current-price">{{ producto.precio | currency }}</span>
          <span class="old-price" *ngIf="producto.precioAnterior">{{ producto.precioAnterior | currency }}</span>
        </div>
        <div class="badges">
          <span class="badge status" [class.in-stock]="producto.enStock">
             {{ producto.enStock ? '✅ En Stock' : '❌ Agotado' }}
          </span>
          <span class="badge offer" *ngIf="producto.enOferta">🔥 OFERTA</span>
          <span class="badge shipping">🚚 Envío Gratis</span>
        </div>
      </div>

      <div class="description-teaser">
        {{ producto.descripcion || 'Este producto premium cuenta con las mejores especificaciones del mercado, diseñado para profesionales exigentes.' }}
      </div>

      <div class="selectors">
        <div class="selector-group">
          <label>Configuración / Variante</label>
          <div class="variant-chips">
            <button class="chip active">Estándar</button>
            <button class="chip" *ngFor="let attr of producto.atributos.slice(0,2)">{{ attr }}</button>
          </div>
        </div>
        
        <div class="stock-action" *ngIf="!soloLectura">
          <label>Cantidad</label>
          <div class="quantity-picker">
            <button class="q-btn" (click)="cambiarCantidad(-1)" [disabled]="cantidad <= 1">-</button>
            <span class="q-val">{{ cantidad }}</span>
            <button class="q-btn" (click)="cambiarCantidad(1)">+</button>
          </div>
        </div>
      </div>

      <div class="action-buttons" *ngIf="!soloLectura">
        <button class="btn btn-primary buy-now" (click)="alComprarAhora()">Comprar ahora</button>
        <button class="btn btn-outline add-cart" (click)="alAgregarAlCarrito()">
          <span class="icon">🛒</span> Añadir al carrito
        </button>
      </div>

      <div class="trust-footer">
        <div class="trust-item">🛡️ 1 año de garantía oficial</div>
        <div class="trust-item">🔄 30 días para devoluciones</div>
        <div class="trust-item">💳 Pago seguro 100%</div>
      </div>
    </div>
  `,
  styles: [`
    .product-info-container { display: flex; flex-direction: column; gap: 2rem; }
    .breadcrumb { font-size: 0.8rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.05em; }
    .product-title { font-size: 3rem; font-weight: 900; line-height: 1; color: var(--text-main); letter-spacing: -0.03em; }
    .product-code { font-size: 0.85rem; color: var(--text-muted); font-family: monospace; }
    
    .price-section { display: flex; flex-direction: column; gap: 1rem; }
    .prices { display: flex; align-items: baseline; gap: 1rem; }
    .current-price { font-size: 3.5rem; font-weight: 900; color: var(--text-main); }
    .old-price { font-size: 1.5rem; color: var(--text-muted); text-decoration: line-through; }
    
    .badges { display: flex; gap: 0.75rem; flex-wrap: wrap; }
    .badge { padding: 0.4rem 1rem; border-radius: 999px; font-size: 0.75rem; font-weight: 800; border: 1px solid var(--border); }
    .badge.status.in-stock { background: #ecfdf5; color: #059669; border-color: #059669; }
    .badge.offer { background: #fef2f2; color: #ef4444; border-color: #ef4444; }
    .badge.shipping { background: #eff6ff; color: var(--primary); border-color: var(--primary); }

    .description-teaser { color: var(--text-muted); line-height: 1.6; font-size: 1.05rem; }

    .selectors { display: flex; flex-direction: column; gap: 2rem; padding: 2rem 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
    .selector-group label { display: block; font-size: 0.9rem; font-weight: 800; margin-bottom: 1rem; }
    .variant-chips { display: flex; gap: 0.75rem; }
    .chip { padding: 0.6rem 1.25rem; border: 1px solid var(--border); border-radius: var(--radius-lg); background: white; font-weight: 600; cursor: pointer; transition: 0.2s; }
    .chip.active { background: black; color: white; border-color: black; }
    .chip:hover:not(.active) { border-color: black; }

    .stock-action label { display: block; font-size: 0.9rem; font-weight: 800; margin-bottom: 1rem; }
    .quantity-picker { display: flex; align-items: center; border: 2px solid black; border-radius: var(--radius-xl); width: fit-content; overflow: hidden; }
    .q-btn { padding: 0.75rem 1.5rem; background: white; border: none; cursor: pointer; font-size: 1.25rem; font-weight: 800; }
    .q-btn:hover { background: #f8fafc; }
    .q-btn:disabled { opacity: 0.3; cursor: not-allowed; }
    .q-val { padding: 0 1.5rem; font-weight: 800; font-size: 1.1rem; border-left: 1px solid var(--border); border-right: 1px solid var(--border); }

    .action-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1rem; }
    .btn { height: 4rem; font-size: 1.1rem; font-weight: 900; border-radius: var(--radius-xl); display: flex; align-items: center; justify-content: center; gap: 0.75rem; }
    .buy-now { background: black; color: white; }
    .buy-now:hover { background: #1a1a1a; }
    .add-cart { background: white; border: 2px solid black; }
    .add-cart:hover { background: #f8fafc; }

    .trust-footer { display: flex; gap: 2rem; justify-content: space-between; padding-top: 1rem; }
    .trust-item { font-size: 0.8rem; font-weight: 700; color: var(--text-muted); }

    @media (max-width: 1200px) {
      .trust-footer { flex-direction: column; gap: 0.75rem; }
    }
  `]
})
export class InformacionProductoComponente {
  @Input({ required: true }) producto!: Producto;
  @Input() soloLectura: boolean = false;
  sCarrito = inject(ServicioCarrito);
  router = inject(Router);
  cantidad = 1;

  cambiarCantidad(delta: number) {
    this.cantidad = Math.max(1, this.cantidad + delta);
  }

  alAgregarAlCarrito() {
    this.sCarrito.agregarAlCarrito(this.producto, this.cantidad);
  }

  alComprarAhora() {
    this.sCarrito.vaciarCarrito();
    this.sCarrito.agregarAlCarrito(this.producto, this.cantidad);
    this.router.navigate(['/pago/paso-1']);
  }
}
