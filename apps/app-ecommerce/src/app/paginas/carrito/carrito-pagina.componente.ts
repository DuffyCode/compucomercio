/**
 * @file carrito-pagina.componente.ts
 * @description Página del carrito de compras.
 *
 * Muestra todos los artículos del carrito agrupados en dos secciones:
 * - **Artículos activos**: listos para comprar
 * - **Guardados para después**: el usuario los apartó pero no los quita del carrito
 *
 * Si el carrito está vacío, muestra un estado vacío con un CTA para volver a la tienda.
 * El estado completo del carrito (artículos, totales, envío) viene de `ServicioCarrito`.
 *
 * Sub-componentes:
 * - `app-articulo-carrito`  → Fila de un producto con controles de cantidad y eliminar
 * - `app-resumen-carrito`   → Panel lateral con subtotal, envío, impuesto y botón de pago
 */
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioCarrito } from '../../nucleo/servicios/carrito.servicio';
import { ComponenteArticuloCarrito } from './ui/carrito-articulo.componente';
import { ComponenteResumenCarrito } from './ui/carrito-resumen.componente';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagina-carrito',
  standalone: true,
  imports: [CommonModule, ComponenteArticuloCarrito, ComponenteResumenCarrito, RouterLink],
  template: `
    <div class="cart-container">
      <div class="cart-header">
        <div class="title-row">
          <span class="icon">🛒</span>
          <h1>Mi Carrito</h1>
        </div>
        <div class="header-info">
          <span>{{ sCarrito.articulosActivos().length }} artículos activos</span>
          <span class="divider">•</span>
          <span class="secure-badge">🔒 Pago 100% Seguro</span>
        </div>
      </div>

      <div class="cart-layout">
        <div class="cart-items-section">
          <div class="items-list" *ngIf="sCarrito.articulos().length > 0; else emptyCart">
            
            <div class="items-group" *ngIf="sCarrito.articulosActivos().length > 0">
              <app-articulo-carrito *ngFor="let item of sCarrito.articulosActivos()" [articulo]="item"></app-articulo-carrito>
            </div>

            <div class="saved-section" *ngIf="articulosGuardados().length > 0">
              <h3 class="saved-title">Guardado para después ({{ articulosGuardados().length }})</h3>
              <div class="items-group">
                <app-articulo-carrito *ngFor="let item of articulosGuardados()" [articulo]="item"></app-articulo-carrito>
              </div>
            </div>
            
          </div>
          
          <ng-template #emptyCart>
            <div class="empty-state">
              <span class="empty-icon">🛍️</span>
              <h2>Tu carrito está vacío</h2>
              <p>Busca entre nuestros miles de productos tecnológicos y encuentra lo que necesitas.</p>
              <button class="btn btn-primary" routerLink="/">Volver a la tienda</button>
            </div>
          </ng-template>

          <div class="cart-footer-actions" *ngIf="sCarrito.articulos().length > 0 || articulosGuardados().length > 0">
             <div class="coupon-box">
                <label for="coupon-input">¿Tienes un cupón?</label>
                <div class="coupon-form">
                  <input id="coupon-input" type="text" placeholder="Código de descuento" #couponInput>
                  <button class="btn btn-secondary" (click)="aplicarCupon(couponInput.value)">Aplicar</button>
                </div>
                <p class="coupon-msg" *ngIf="cuponAplicado()">Cupón <strong>{{ cuponAplicado() }}</strong> aplicado con éxito ✅</p>
             </div>

             <div class="trust-badges">
                <div class="badge-item">
                  <span class="badge-icon">🚚</span>
                  <div class="badge-text">
                    <strong>Envío Prioritario</strong>
                    <span>Recibe en 24-48h</span>
                  </div>
                </div>
                <div class="badge-item">
                  <span class="badge-icon">🛡️</span>
                  <div class="badge-text">
                    <strong>Garantía Total</strong>
                    <span>30 días de devolución</span>
                  </div>
                </div>
             </div>
          </div>
        </div>

        <div class="cart-summary-section" *ngIf="sCarrito.articulos().length > 0">
          <app-resumen-carrito></app-resumen-carrito>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 1.5rem;
    }
    .cart-header { margin-bottom: 3.5rem; }
    .title-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; }
    .title-row .icon { font-size: 2.5rem; }
    .title-row h1 { font-size: 2.75rem; font-weight: 800; letter-spacing: -0.02em; }
    .header-info { display: flex; align-items: center; gap: 1rem; color: var(--text-muted); font-weight: 500; }
    .secure-badge { color: #059669; font-weight: 700; background: #ecfdf5; padding: 0.2rem 0.75rem; border-radius: 999px; font-size: 0.85rem; }
    
    .cart-layout {
      display: grid;
      grid-template-columns: 1.8fr 1fr;
      gap: 4.5rem;
      align-items: flex-start;
    }
    
    .items-group { display: flex; flex-direction: column; border-top: 1px solid var(--border); }
    
    .saved-section { margin-top: 4rem; }
    .saved-title { font-size: 1.25rem; font-weight: 800; margin-bottom: 1.5rem; padding-left: 0.5rem; }
    
    .empty-state {
      text-align: center; padding: 6rem 2rem;
      background: white; border-radius: var(--radius-2xl);
      border: 1px solid var(--border); box-shadow: var(--shadow-sm);
    }
    .empty-icon { font-size: 5rem; display: block; margin-bottom: 2rem; }
    .empty-state h2 { font-size: 1.75rem; margin-bottom: 0.75rem; }
    .empty-state p { color: var(--text-muted); margin-bottom: 2.5rem; max-width: 400px; margin-inline: auto; }
    
    .cart-footer-actions {
      margin-top: 4rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      background: #f8fafc;
      padding: 2.5rem;
      border-radius: var(--radius-2xl);
      border: 1px solid var(--border);
    }
    
    .coupon-box label { display: block; font-weight: 700; margin-bottom: 1rem; color: var(--text-main); }
    .coupon-form { display: flex; gap: 0.75rem; }
    .coupon-form input {
      flex: 1; padding: 0.875rem 1.25rem;
      border: 1px solid var(--border); border-radius: var(--radius-xl);
      font-size: 1rem; outline: none; transition: var(--transition);
    }
    .coupon-form input:focus { border-color: var(--primary); box-shadow: 0 0 0 4px var(--primary-light); }
    .coupon-msg { margin-top: 0.75rem; font-size: 0.875rem; color: #15803d; }
    
    .trust-badges { display: flex; flex-direction: column; gap: 1.5rem; justify-content: center; }
    .badge-item { display: flex; align-items: center; gap: 1rem; }
    .badge-icon {
      font-size: 1.75rem; width: 54px; height: 54px;
      background: white; border: 1px solid var(--border);
      border-radius: var(--radius-xl); display: flex;
      align-items: center; justify-content: center;
    }
    .badge-text { display: flex; flex-direction: column; }
    .badge-text strong { font-size: 0.95rem; color: var(--text-main); }
    .badge-text span { font-size: 0.8rem; color: var(--text-muted); }

    @media (max-width: 1024px) {
      .cart-layout { grid-template-columns: 1fr; gap: 3rem; }
      .cart-footer-actions { grid-template-columns: 1fr; }
    }
  `]
})
export class PaginaCarrito {
  sCarrito = inject(ServicioCarrito);
  cuponAplicado = signal<string | null>(null);

  /**
   * Filtra los artículos del carrito que el usuario guardó para después.
   * Los artículos guardados no se incluyen en el subtotal de la compra.
   */
  articulosGuardados = () => this.sCarrito.articulos().filter(a => a.guardado);

  /**
   * Valida y aplica un código de cupón al pedido.
   * Por ahora acepta cualquier código no vacío (la validación real se hará con la API).
   * @param codigo - El código ingresado por el usuario
   */
  aplicarCupon(codigo: string) {
    if (codigo.trim()) {
      this.cuponAplicado.set(codigo.toUpperCase());
    }
  }
}
