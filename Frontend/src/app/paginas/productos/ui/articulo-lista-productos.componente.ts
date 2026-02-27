import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicioVistaRapida } from '../../../nucleo/servicios/vista-rapida.servicio';
import { ServicioCarrito } from '../../../nucleo/servicios/carrito.servicio';

@Component({
  selector: 'app-articulo-lista-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="product-item">
      <div class="product-image" [routerLink]="['/producto', codigo]">
        <img *ngIf="imagen" [src]="imagen" [alt]="nombre" class="prod-img" />
        <div class="promo-badge" *ngIf="enOferta">Oferta</div>
      </div>
      <div class="product-details">
        <div (click)="$event.stopPropagation()" [routerLink]="['/producto', codigo]" style="cursor: pointer;">
          <h3 class="product-name">{{ nombre }}</h3>
          <span class="product-ref">REF: {{ codigo }}</span>
        </div>
        
        <div class="attributes">
          <span class="attr-tag">Core i7</span>
          <span class="attr-tag">16GB RAM</span>
        </div>

        <div class="status">
          <span class="status-indicator" [class.in-stock]="enStock"></span>
          {{ enStock ? 'En stock' : 'Sin stock' }}
        </div>
      </div>
      <div class="product-pricing">
        <div class="price-container">
          <span class="old-price" *ngIf="enOferta">$1,499</span>
          <span class="current-price">{{ precio }}</span>
        </div>
        <div class="item-actions">
          <button class="btn btn-secondary" (click)="alVistaRapida($event)">Vista rápida</button>
          <button class="btn btn-primary" (click)="alAgregarAlCarrito($event)">Añadir</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-item {
      display: flex;
      align-items: center;
      padding: 1.5rem;
      background: white;
      border-radius: var(--radius-xl);
      border: 1px solid var(--border);
      gap: 2rem;
      transition: var(--transition);
    }
    .product-item:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
      border-color: var(--primary);
    }
    .product-image {
      width: 120px;
      height: 120px;
      background: var(--background);
      border-radius: var(--radius-lg);
      position: relative;
      flex-shrink: 0;
      cursor: pointer;
      overflow: hidden;
    }
    .prod-img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
    .product-item:hover .prod-img { transform: scale(1.05); }
    .promo-badge {
      position: absolute;
      top: -0.5rem;
      right: -0.5rem;
      background: #fef2f2;
      color: #ef4444;
      padding: 0.25rem 0.625rem;
      border-radius: 2rem;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .product-details {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .product-name {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-main);
    }
    .product-ref {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 500;
    }
    .attributes {
      display: flex;
      gap: 0.5rem;
      margin: 0.25rem 0;
    }
    .attr-tag {
      background: var(--background);
      border: 1px solid var(--border);
      padding: 0.125rem 0.5rem;
      border-radius: 4px;
      font-size: 0.7rem;
      color: var(--text-muted);
    }
    .status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-muted);
    }
    .status-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #f59e0b;
    }
    .status-indicator.in-stock {
      background: #10b981;
    }
    .product-pricing {
      text-align: right;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      min-width: 150px;
    }
    .price-container {
      display: flex;
      flex-direction: column;
    }
    .old-price {
      font-size: 0.875rem;
      color: var(--text-muted);
      text-decoration: line-through;
    }
    .current-price {
      font-size: 1.75rem;
      font-weight: 800;
      color: var(--text-main);
    }
    .item-actions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .item-actions .btn {
      width: 100%;
      font-size: 0.8rem;
    }
  `]
})
export class ComponenteArticuloListaProductos {
  @Input() nombre: string = 'Producto';
  @Input() precio: string = '$0.00';
  @Input() codigo: string = 'CODE-00';
  @Input() enStock: boolean = true;
  @Input() enOferta: boolean = false;
  @Input() imagen: string = '';

  private sVistaRapida = inject(ServicioVistaRapida);
  private sCarrito = inject(ServicioCarrito);

  alVistaRapida(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.sVistaRapida.abrir({
      id: this.codigo,
      nombre: this.nombre,
      codigo: this.codigo,
      precio: this.precio,
      imagen: this.imagen,
      enOferta: this.enOferta
    });
  }

  alAgregarAlCarrito(event: Event) {
    event.stopPropagation();
    this.sCarrito.agregarAlCarrito({
      id: this.codigo,
      nombre: this.nombre,
      codigo: this.codigo,
      precio: this.precio
    });
  }
}
