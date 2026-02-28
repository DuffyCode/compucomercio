/**
 * @file vista-rapida.componente.ts
 * @description Modal de vista rápida de producto (componente compartido).
 *
 * Este componente se incluye una sola vez en el layout principal (`principal.ts`)
 * y permanece oculto hasta que `ServicioVistaRapida.abrir()` sea llamado.
 * Al abrirse, muestra imagen, nombre, precio y permite agregar al carrito
 * o comprar directamente sin salir de la página actual.
 *
 * Usa las animaciones globales `desvanecer` y `deslizarY` de compartido/animaciones.
 */
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServicioVistaRapida } from '../../nucleo/servicios/vista-rapida.servicio';
import { ServicioCarrito } from '../../nucleo/servicios/carrito.servicio';
import { desvanecer, deslizarY } from '../animaciones';

/**
 * Componente de Vista Rápida que muestra un resumen del producto en un modal animado.
 */
@Component({
  selector: 'app-vista-rapida',
  standalone: true,
  imports: [CommonModule],
  animations: [desvanecer, deslizarY],
  template: `
    <div class="modal-backdrop" *ngIf="svRapida.estaAbierto()"
         role="button"
         tabindex="0"
         aria-label="Cerrar vista rápida"
         (click)="svRapida.cerrar()"
         (keydown.enter)="svRapida.cerrar()"
         (keydown.escape)="svRapida.cerrar()"
         @desvanecer>
      <div class="modal-content" tabindex="-1" (click)="$event.stopPropagation()" (keydown)="$event.stopPropagation()" @deslizarY>
        <button class="close-btn" (click)="svRapida.cerrar()">×</button>
        
        <div class="modal-body">
          <div class="product-visual">
            <div class="main-image">
               <img *ngIf="svRapida.productoSeleccionado()?.imagen; else iconoPh" 
                    [src]="svRapida.productoSeleccionado()?.imagen" 
                    alt="Vista previa" class="quick-img">
               <ng-template #iconoPh><span class="ph">💻</span></ng-template>
            </div>
            <span class="img-caption">Vista previa rápida</span>
          </div>

          <div class="product-details">
            <div class="header">
              <span class="brand">PREMIUM TECH</span>
              <h2 class="title">{{ svRapida.productoSeleccionado()?.nombre || 'Producto' }}</h2>
              <span class="code">SKU: {{ svRapida.productoSeleccionado()?.codigo || 'REF-100' }}</span>
            </div>
            
            <div class="rating">
              <span class="stars">★★★★★</span>
              <span class="reviews">(48 reseñas)</span>
            </div>
            
            <div class="price-row">
              <span class="price">{{ svRapida.productoSeleccionado()?.precio | currency }}</span>
              <span class="discount-badge" *ngIf="svRapida.productoSeleccionado()?.enOferta">OFERTA</span>
            </div>

            <p class="description">
              Experimenta el rendimiento definitivo con este dispositivo de última generación.
            </p>

            <div class="selectors">
              <div class="quantity-row">
                <div class="quantity-picker">
                  <button (click)="cambiarCantidad(-1)" [disabled]="cantidad <= 1">−</button>
                  <span class="val">{{ cantidad }}</span>
                  <button (click)="cambiarCantidad(1)">+</button>
                </div>
                <span class="stock-status">✅ Disponible hoy</span>
              </div>
            </div>

            <div class="actions">
              <button class="btn btn-primary" (click)="alComprarAhora()">Comprar Ahora</button>
              <button class="btn btn-outline" (click)="alAgregarAlCarrito()">Añadir al Carrito</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed; inset: 0;
      background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(12px);
      display: flex; align-items: center; justify-content: center;
      z-index: 2000; padding: 1.5rem;
    }

    .modal-content {
      background: white; width: 100%; max-width: 800px;
      border-radius: var(--radius-2xl); box-shadow: var(--shadow-2xl);
      position: relative; overflow: hidden; border: 1px solid var(--border);
    }

    .close-btn {
      position: absolute; top: 1.5rem; right: 1.5rem;
      background: #f1f5f9; border: none; width: 40px; height: 40px;
      border-radius: 50%; font-size: 1.5rem; color: #64748b;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: all 0.3s; z-index: 10;
    }
    .close-btn:hover { background: black; color: white; transform: rotate(90deg); }
    
    .modal-body { display: grid; grid-template-columns: 1fr 1.2fr; gap: 3rem; padding: 4rem; }

    .product-visual { display: flex; flex-direction: column; gap: 1rem; }
    .main-image {
      width: 100%; aspect-ratio: 1; background: #f8fafc; border-radius: var(--radius-xl);
      display: flex; align-items: center; justify-content: center; overflow: hidden;
      border: 1px solid var(--border);
    }
    .quick-img { width: 100%; height: 100%; object-fit: cover; }
    .ph { font-size: 6rem; }
    .img-caption { font-size: 0.75rem; color: var(--text-muted); text-align: center; font-weight: 700; text-transform: uppercase; }
    
    .product-details { display: flex; flex-direction: column; gap: 1.25rem; }
    .brand { font-size: 0.7rem; font-weight: 800; color: var(--primary); letter-spacing: 0.1em; }
    .title { font-size: 2rem; font-weight: 900; line-height: 1.1; color: var(--text-main); }
    .code { font-size: 0.8rem; color: var(--text-muted); font-family: monospace; }
    
    .rating { display: flex; align-items: center; gap: 0.5rem; }
    .stars { color: #f59e0b; font-size: 1.1rem; }
    .reviews { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }
    
    .price-row { display: flex; align-items: center; gap: 1rem; margin: 0.5rem 0; }
    .price { font-size: 2.5rem; font-weight: 900; color: var(--text-main); }
    .discount-badge { background: #fee2e2; color: #ef4444; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.7rem; font-weight: 800; }
    
    .description { font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; }

    .selectors { padding: 1.5rem 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
    .quantity-row { display: flex; align-items: center; gap: 2rem; }
    .quantity-picker { display: flex; border: 2px solid black; border-radius: var(--radius-lg); overflow: hidden; }
    .quantity-picker button { width: 40px; height: 40px; background: white; border: none; cursor: pointer; font-weight: 800; font-size: 1.1rem; }
    .quantity-picker button:hover { background: #f8fafc; }
    .quantity-picker .val { width: 40px; display: flex; align-items: center; justify-content: center; font-weight: 800; border-left: 1px solid var(--border); border-right: 1px solid var(--border); }
    .stock-status { font-size: 0.85rem; font-weight: 700; color: #10b981; }
    
    .actions { display: flex; gap: 1.5rem; margin-top: 1rem; }
    .actions .btn { flex: 1; height: 3.5rem; font-weight: 800; border-radius: var(--radius-xl); }

    @media (max-width: 768px) {
      .modal-body { grid-template-columns: 1fr; padding: 2rem; gap: 2rem; }
      .product-visual { display: none; }
    }
  `]
})
export class ComponenteVistaRapida {
  svRapida = inject(ServicioVistaRapida);
  sCarrito = inject(ServicioCarrito);
  router = inject(Router);

  /** Cantidad seleccionada por el usuario en el selector del modal. */
  cantidad = 1;

  /** Incrementa o decrementa la cantidad sin bajar de 1. */
  cambiarCantidad(delta: number) {
    this.cantidad = Math.max(1, this.cantidad + delta);
  }

  /**
   * Agrega el producto seleccionado al carrito con la cantidad indicada
   * y cierra el modal.
   */
  alAgregarAlCarrito() {
    const producto = this.svRapida.productoSeleccionado();
    if (producto) {
      this.sCarrito.agregarAlCarrito(producto, this.cantidad);
      this.svRapida.cerrar();
      this.resatear();
    }
  }

  /**
   * Compra directamente el producto: limpia el carrito, agrega solo este
   * producto y redirige al flujo de pago.
   */
  alComprarAhora() {
    const producto = this.svRapida.productoSeleccionado();
    if (producto) {
      this.sCarrito.vaciarCarrito();
      this.sCarrito.agregarAlCarrito(producto, this.cantidad);
      this.svRapida.cerrar();
      this.resatear();
      this.router.navigate(['/pago/paso-1']);
    }
  }

  private resatear() {
    this.cantidad = 1;
  }
}
