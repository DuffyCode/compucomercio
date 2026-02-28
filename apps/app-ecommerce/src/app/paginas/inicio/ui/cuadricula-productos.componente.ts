import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ServicioVistaRapida } from '../../../nucleo/servicios/vista-rapida.servicio';
import { ServicioCarrito } from '../../../nucleo/servicios/carrito.servicio';
import { cascada } from '../../../compartido/animaciones';
import { PRODUCTOS_EJEMPLO, Producto } from '../../../nucleo/datos-productos';

@Component({
  selector: 'app-cuadricula-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  animations: [cascada],
  template: `
    <section class="products-section" id="productos-destacados">
      <div class="section-header">
        <h2>Productos Destacados</h2>
        <p>Seleccionados especialmente para ti</p>
      </div>
      <div class="product-grid" [@cascada]="productos.length">
        <div class="product-card" *ngFor="let p of productos">
          <div class="product-image" [routerLink]="['/producto', p.id]">
            <img [src]="p.imagen" [alt]="p.nombre" class="prod-img" loading="lazy" />
            <div class="badge" *ngIf="p.enOferta">Oferta</div>
            <div class="badge nuevo" *ngIf="!p.enOferta">Nuevo</div>
            <button class="quick-view-overlay" (click)="alVistaRapida($event, p)">
              Vista Rápida
            </button>
          </div>
          <div class="product-info">
            <span class="category">{{ p.categoria }}</span>
            <div [routerLink]="['/producto', p.id]" style="cursor: pointer;">
              <h3>{{ p.nombre }}</h3>
            </div>
            <div class="stars">
              <span *ngFor="let s of estrellas(p.estrellas)">⭐</span>
              <span class="review-count">({{ p.resenas }})</span>
            </div>
            <div class="price-row">
              <div class="price-group">
                <span class="old-price" *ngIf="p.precioAnterior">{{ '$' + p.precioAnterior.toLocaleString() }}</span>
                <span class="price">{{ '$' + p.precio.toLocaleString() }}</span>
              </div>
              <button class="add-cart-btn" title="Añadir al carrito" (click)="alAgregarAlCarrito($event, p)">
                <span>+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .products-section {
      padding: 4rem 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .section-header {
      text-align: center;
      margin-bottom: 3.5rem;
    }
    .section-header h2 {
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 0.5rem;
    }
    .section-header p {
      color: var(--text-muted);
      font-size: 1rem;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.75rem;
    }
    .product-card {
      background: white;
      border-radius: var(--radius-xl);
      border: 1px solid var(--border);
      overflow: hidden;
      transition: var(--transition);
    }
    .product-card:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-6px);
      border-color: var(--primary);
    }
    .product-image {
      position: relative;
      height: 200px;
      overflow: hidden;
      cursor: pointer;
      background: #f8fafc;
    }
    .prod-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .product-card:hover .prod-img { transform: scale(1.06); }
    .badge {
      position: absolute;
      top: 0.75rem;
      left: 0.75rem;
      background: #fef2f2;
      color: #ef4444;
      padding: 0.25rem 0.625rem;
      border-radius: 2rem;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .badge.nuevo { background: #eff6ff; color: #3b82f6; }
    .quick-view-overlay {
      position: absolute;
      bottom: -3rem;
      left: 0;
      right: 0;
      background: rgba(99,102,241,0.95);
      color: white;
      border: none;
      padding: 0.75rem;
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      transition: bottom 0.3s ease;
      font-family: inherit;
    }
    .product-card:hover .quick-view-overlay { bottom: 0; }
    .product-info {
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .category {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--primary);
    }
    h3 {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text-main);
      line-height: 1.3;
    }
    .stars {
      display: flex;
      align-items: center;
      gap: 0.1rem;
      font-size: 0.65rem;
    }
    .review-count { color: var(--text-muted); font-size: 0.75rem; margin-left: 0.3rem; }
    .price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.5rem;
    }
    .price-group { display: flex; flex-direction: column; }
    .old-price { font-size: 0.75rem; color: var(--text-muted); text-decoration: line-through; }
    .price { font-size: 1.5rem; font-weight: 800; color: var(--text-main); }
    .add-cart-btn {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: var(--primary);
      color: white;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
      flex-shrink: 0;
    }
    .add-cart-btn:hover { background: var(--primary-dark); transform: scale(1.1); }
  `]
})
export class CuadriculaProductosComponente {
  private sVistaRapida = inject(ServicioVistaRapida);
  private sCarrito = inject(ServicioCarrito);
  private router = inject(Router);

  productos: Producto[] = PRODUCTOS_EJEMPLO.slice(0, 4);

  estrellas(n: number): number[] { return Array(n).fill(0); }

  alVistaRapida(event: Event, p: Producto) {
    event.preventDefault();
    event.stopPropagation();
    this.sVistaRapida.abrir({
      id: p.id,
      nombre: p.nombre,
      codigo: p.codigo,
      precio: p.precio,
      imagen: p.imagen,
      enOferta: p.enOferta
    });
  }

  alAgregarAlCarrito(event: Event, p: Producto) {
    event.stopPropagation();
    this.sCarrito.agregarAlCarrito({ id: p.id, nombre: p.nombre, codigo: p.codigo, precio: p.precio, imagen: p.imagen });
  }
}
