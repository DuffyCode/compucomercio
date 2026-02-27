import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioCarrito, ArticuloCarrito } from '../../../nucleo/servicios/carrito.servicio';

/**
 * Artículo del carrito con botón toggle "Guardar para después" / "Comprar esta vez".
 */
@Component({
  selector: 'app-articulo-carrito',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-item" [class.saved]="articulo.guardado">
      <div class="product-info-group">
        <div class="product-image">
          <img *ngIf="articulo.imagen; else iconoPh" [src]="articulo.imagen" [alt]="articulo.nombre" class="item-img" />
          <ng-template #iconoPh><span class="img-placeholder">💻</span></ng-template>
          <div class="saved-overlay" *ngIf="articulo.guardado">
            <span>Guardado</span>
          </div>
        </div>
        <div class="product-details">
          <h3 class="product-name" [class.muted]="articulo.guardado">{{ articulo.nombre }}</h3>
          <span class="sku">SKU: {{ articulo.codigo }}</span>
          <div class="rating">★★★★☆</div>
          <span class="selected-option">Gris Espacial</span>
          <div class="item-footer">
            <button class="save-btn" [class.active]="articulo.guardado" (click)="toggleGuardar()">
              {{ articulo.guardado ? '🛒 Comprar esta vez' : '🔖 Guardar para después' }}
            </button>
            <button class="delete-btn" (click)="sCarrito.eliminarDelCarrito(articulo.id)">
              🗑️ Eliminar
            </button>
          </div>
        </div>
      </div>

      <div class="item-pricing" [class.muted]="articulo.guardado">
        <span class="unit-price">{{ articulo.precio | currency }}</span>
        <div class="quantity-control">
          <div class="quantity-picker">
            <button (click)="sCarrito.actualizarCantidad(articulo.id, -1)" [disabled]="articulo.guardado">-</button>
            <span class="val">{{ articulo.cantidad }}</span>
            <button (click)="sCarrito.actualizarCantidad(articulo.id, 1)" [disabled]="articulo.guardado">+</button>
          </div>
          <span class="line-total">{{ (articulo.precio * articulo.cantidad) | currency }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-item {
      display: flex;
      justify-content: space-between;
      padding: 1.5rem 0;
      border-bottom: 1px solid var(--border);
      gap: 2rem;
      transition: opacity 0.3s;
    }
    .cart-item.saved { background: #f8fafc; border-radius: var(--radius-lg); padding: 1.5rem; border: 1px dashed var(--border); opacity: 0.85; }
    .product-info-group { display: flex; gap: 1.5rem; flex: 1; }
    .product-image {
      width: 110px; height: 110px;
      background: var(--background);
      border-radius: var(--radius-lg);
      display: flex; align-items: center; justify-content: center;
      font-size: 2.5rem; border: 1px solid var(--border);
      overflow: hidden; position: relative; flex-shrink: 0;
    }
    .item-img { width: 100%; height: 100%; object-fit: cover; }
    .img-placeholder { font-size: 2.5rem; }
    .saved-overlay {
      position: absolute; inset: 0; background: rgba(0,0,0,0.45);
      display: flex; align-items: center; justify-content: center;
      color: white; font-size: 0.75rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.05em;
    }
    .product-details { display: flex; flex-direction: column; gap: 0.25rem; flex: 1; }
    .product-name { font-size: 1rem; font-weight: 700; color: var(--text-main); }
    .product-name.muted { color: var(--text-muted); }
    .sku { font-size: 0.75rem; color: var(--text-muted); }
    .rating { color: #f59e0b; font-size: 0.8rem; }
    .selected-option { font-size: 0.875rem; color: var(--text-muted); }
    .item-footer { display: flex; gap: 0.75rem; margin-top: auto; flex-wrap: wrap; }
    .save-btn {
      background: none; border: 1px solid var(--border);
      padding: 0.35rem 0.75rem; border-radius: var(--radius-lg);
      font-size: 0.8rem; color: var(--primary);
      cursor: pointer; font-family: inherit; transition: var(--transition);
      font-weight: 500;
    }
    .save-btn.active { background: #eff6ff; border-color: var(--primary); }
    .save-btn:hover { background: var(--primary-light); }
    .delete-btn {
      background: none; border: 1px solid #fee2e2;
      padding: 0.35rem 0.75rem; border-radius: var(--radius-lg);
      font-size: 0.8rem; color: #ef4444;
      cursor: pointer; font-family: inherit; transition: var(--transition);
      font-weight: 500;
    }
    .delete-btn:hover { background: #fef2f2; }
    .item-pricing { display: flex; flex-direction: column; align-items: flex-end; gap: 1rem; min-width: 130px; }
    .item-pricing.muted { opacity: 0.5; }
    .unit-price { font-size: 1.25rem; font-weight: 700; }
    .quantity-control { display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem; }
    .quantity-picker { display: flex; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
    .quantity-picker button { padding: 0.25rem 0.75rem; background: white; border: none; cursor: pointer; font-weight: 700; transition: var(--transition); }
    .quantity-picker button:disabled { opacity: 0.4; cursor: not-allowed; }
    .quantity-picker button:not(:disabled):hover { background: var(--background); }
    .quantity-picker .val { padding: 0 1rem; display: flex; align-items: center; font-weight: 600; border-left: 1px solid var(--border); border-right: 1px solid var(--border); }
    .line-total { font-size: 0.875rem; font-weight: 600; color: var(--text-muted); }
  `]
})
export class ComponenteArticuloCarrito {
  @Input({ alias: 'item', required: true }) articulo!: ArticuloCarrito;
  sCarrito = inject(ServicioCarrito);

  toggleGuardar() {
    this.sCarrito.toggleGuardado(this.articulo.id);
  }
}
