import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRODUCTOS_EJEMPLO, Producto } from '../../../nucleo/datos-productos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos-relacionados',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="related-products">
      <div class="product-grid">
        <div class="related-card" *ngFor="let p of relacionados" (click)="alVerDetalle(p.id)">
          <div class="card-image">
            <img [src]="p.imagen" [alt]="p.nombre" class="prod-img" />
            <div class="badge-promo" *ngIf="p.enOferta">OFERTA</div>
          </div>
          <div class="card-info">
            <span class="category">{{ p.categoria }}</span>
            <h4>{{ p.nombre }}</h4>
            <div class="price-row">
              <span class="price">{{ p.precio | currency }}</span>
              <span class="old-price" *ngIf="p.precioAnterior">{{ p.precioAnterior | currency }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2.5rem;
    }
    .related-card {
      background: white;
      border: 1px solid var(--border);
      border-radius: var(--radius-2xl);
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
      cursor: pointer;
      position: relative;
    }
    .related-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.08);
      border-color: var(--primary);
    }
    .card-image {
      height: 220px;
      background: #f8fafc;
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .prod-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }
    .related-card:hover .prod-img { transform: scale(1.1); }
    
    .badge-promo {
      position: absolute; top: 1rem; right: 1rem;
      background: #ef4444; color: white; padding: 0.25rem 0.75rem;
      border-radius: 999px; font-size: 0.7rem; font-weight: 800;
    }

    .card-info { padding: 1.5rem; display: flex; flex-direction: column; gap: 0.25rem; }
    .category { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--primary); letter-spacing: 0.1em; }
    .card-info h4 { font-size: 1.1rem; font-weight: 700; color: var(--text-main); line-height: 1.3; }
    
    .price-row { display: flex; align-items: baseline; gap: 0.75rem; margin-top: 0.5rem; }
    .price { font-weight: 800; font-size: 1.25rem; color: var(--text-main); }
    .old-price { font-size: 0.9rem; color: var(--text-muted); text-decoration: line-through; }
  `]
})
export class ProductosRelacionadosComponente implements OnInit {
  @Input() categoria: string = '';
  relacionados: Producto[] = [];
  router = inject(Router);

  ngOnInit() {
    this.relacionados = PRODUCTOS_EJEMPLO
      .filter(p => p.categoria === this.categoria)
      .slice(0, 4);

    if (this.relacionados.length < 4) {
      const otros = PRODUCTOS_EJEMPLO
        .filter(p => p.categoria !== this.categoria)
        .slice(0, 4 - this.relacionados.length);
      this.relacionados = [...this.relacionados, ...otros];
    }
  }

  alVerDetalle(id: string) {
    this.router.navigate(['/producto', id]);
  }
}
