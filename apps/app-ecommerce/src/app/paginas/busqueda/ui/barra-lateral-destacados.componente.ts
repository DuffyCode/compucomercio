import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PRODUCTOS_EJEMPLO, Producto } from '../../../nucleo/datos-productos';

@Component({
  selector: 'app-barra-lateral-destacados',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <aside class="featured-sidebar">
      <div class="sidebar-header">
        <span>⭐</span>
        <h3>Productos destacados</h3>
      </div>
      
      <div class="featured-list">
        <div class="mini-card" *ngFor="let p of destacados" [routerLink]="['/producto', p.id]">
          <div class="mini-image">
            <img [src]="p.imagen" [alt]="p.nombre" class="prod-img" />
          </div>
          <div class="mini-info">
            <h4>{{ p.nombre }}</h4>
            <span class="code">{{ p.id }}</span>
            <span class="price-row">
              <span class="price">{{ '$' + p.precio.toLocaleString() }}</span>
              <span class="old-price" *ngIf="p.precioAnterior">{{ '$' + p.precioAnterior.toLocaleString() }}</span>
            </span>
            <span class="badge" [class.stock]="p.enStock" [class.sale]="p.enOferta">
              {{ p.enOferta ? 'En oferta' : (p.enStock ? 'En stock' : 'Sin stock') }}
            </span>
          </div>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .featured-sidebar {
      width: 280px;
      flex-shrink: 0;
      background: white;
      border-radius: var(--radius-xl);
      border: 1px solid var(--border);
      overflow: hidden;
      height: fit-content;
      position: sticky;
      top: 6rem;
    }
    .sidebar-header {
      padding: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      border-bottom: 1px solid var(--border);
      background: #f8fafc;
    }
    .sidebar-header h3 {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-main);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .featured-list {
      display: flex;
      flex-direction: column;
    }
    .mini-card {
      display: flex;
      gap: 1rem;
      padding: 1.25rem;
      border-bottom: 1px solid var(--border);
      transition: var(--transition);
      cursor: pointer;
    }
    .mini-card:hover {
      background: #f1f5f9;
    }
    .mini-card:last-child {
      border-bottom: none;
    }
    .mini-image {
      width: 70px;
      height: 70px;
      background: var(--background);
      border-radius: var(--radius-lg);
      flex-shrink: 0;
      overflow: hidden;
      border: 1px solid var(--border);
    }
    .prod-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .mini-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .mini-info h4 {
      font-size: 0.85rem;
      font-weight: 600;
      line-height: 1.3;
      color: var(--text-main);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .code {
      display: block;
      font-size: 0.7rem;
      color: var(--text-muted);
      font-family: monospace;
    }
    .price-row {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      margin: 0.1rem 0;
    }
    .price {
      font-weight: 700;
      color: var(--text-main);
      font-size: 0.95rem;
    }
    .old-price {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-decoration: line-through;
    }
    .badge {
      align-self: flex-start;
      padding: 0.15rem 0.5rem;
      border-radius: 999px;
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
    }
    .badge.stock {
      background: #dcfce7;
      color: #15803d;
    }
    .badge.sale {
      background: #fef2f2;
      color: #ef4444;
    }
  `]
})
export class BarraLateralDestacadosComponente implements OnInit {
  destacados: Producto[] = [];

  ngOnInit() {
    this.destacados = PRODUCTOS_EJEMPLO.slice(0, 4);
  }
}
