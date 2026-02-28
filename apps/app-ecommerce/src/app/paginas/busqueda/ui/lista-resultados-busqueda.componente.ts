import { Component, inject, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServicioVistaRapida } from '../../../nucleo/servicios/vista-rapida.servicio';
import { ServicioCarrito } from '../../../nucleo/servicios/carrito.servicio';
import { PRODUCTOS_EJEMPLO, Producto } from '../../../nucleo/datos-productos';

@Component({
  selector: 'app-lista-resultados-busqueda',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="results-list">
      <div class="result-item" *ngFor="let p of resultados" (click)="alNavegar(p.id)" (keydown.enter)="alNavegar(p.id)" tabindex="0">
        <div class="item-image">
          <img [src]="p.imagen" [alt]="p.nombre" class="prod-img" />
          <span class="badge" *ngIf="p.enOferta">Oferta</span>
        </div>
        <div class="item-content">
          <div class="item-header">
            <div class="meta">
              <span class="brand">{{ p.marca }}</span>
              <h3>{{ p.nombre }}</h3>
              <span class="item-code">SKU: {{ p.codigo }}</span>
              <div class="stars">
                <span *ngFor="let s of [1,2,3,4,5]; let i = index">{{ i < p.estrellas ? '★' : '☆' }}</span>
                <span class="reviews">({{ p.resenas }})</span>
              </div>
            </div>
            <div class="price-box">
              <span class="price">{{ p.precio | currency }}</span>
              <span class="old-price" *ngIf="p.precioAnterior">{{ p.precioAnterior | currency }}</span>
            </div>
          </div>
          
          <div class="item-footer">
            <p class="tagline">Envío gratis en 48h desde Madrid</p>
            <div class="btn-group">
              <button class="btn btn-outline sm" (click)="alVistaRapida($event, p)">
                👁️ Vista rápida
              </button>
              <button class="btn btn-primary sm" (click)="alAgregarAlCarrito($event, p)">
                🛒 Añadir
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="empty-results" *ngIf="resultados.length === 0">
        <h3>No hemos encontrado lo que buscas</h3>
        <p>Prueba con otros términos o filtros</p>
      </div>
    </div>
  `,
  styles: [`
    .results-list { display: flex; flex-direction: column; gap: 1.5rem; }
    .result-item {
      display: flex; gap: 2rem; padding: 2rem;
      background: white; border-radius: var(--radius-2xl);
      border: 1px solid var(--border); transition: all 0.3s ease;
      cursor: pointer; position: relative;
    }
    .result-item:hover { transform: scale(1.01); border-color: black; box-shadow: var(--shadow-lg); }
    
    .item-image {
      width: 180px; height: 180px; background: #f8fafc;
      border-radius: var(--radius-xl); flex-shrink: 0;
      overflow: hidden; position: relative;
      display: flex; align-items: center; justify-content: center;
    }
    .prod-img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
    .result-item:hover .prod-img { transform: scale(1.1); }
    
    .badge {
      position: absolute; top: 0.75rem; left: 0.75rem;
      background: #ef4444; color: white; padding: 0.25rem 0.75rem;
      border-radius: 999px; font-size: 0.65rem; font-weight: 800;
    }

    .item-content { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
    .item-header { display: flex; justify-content: space-between; align-items: flex-start; }
    
    .brand { font-size: 0.7rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.1em; }
    h3 { font-size: 1.5rem; font-weight: 800; color: var(--text-main); margin: 0.25rem 0; letter-spacing: -0.02em; }
    .item-code { font-size: 0.75rem; color: var(--text-muted); font-family: monospace; }
    
    .stars { color: #f59e0b; font-size: 0.9rem; margin-top: 0.5rem; display: flex; align-items: center; gap: 0.25rem; }
    .reviews { color: var(--text-muted); font-size: 0.75rem; font-weight: 600; }

    .price-box { text-align: right; display: flex; flex-direction: column; }
    .price { font-size: 2rem; font-weight: 900; color: var(--text-main); line-height: 1; }
    .old-price { font-size: 1rem; color: var(--text-muted); text-decoration: line-through; margin-top: 0.25rem; }

    .item-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border); }
    .tagline { font-size: 0.85rem; color: #10b981; font-weight: 700; }

    .btn-group { display: flex; gap: 1rem; }
    .btn.sm { height: 2.75rem; padding: 0 1.25rem; font-size: 0.85rem; font-weight: 800; border-radius: var(--radius-lg); }
    
    .empty-results { padding: 5rem; text-align: center; }

    @media (max-width: 768px) {
      .result-item { flex-direction: column; gap: 1rem; padding: 1.5rem; }
      .item-image { width: 100%; height: 200px; }
      .item-header { flex-direction: column; gap: 1rem; }
      .price-box { text-align: left; }
      .item-footer { flex-direction: column; gap: 1rem; align-items: flex-start; }
      .btn-group { width: 100%; }
      .btn.sm { flex: 1; }
    }
  `]
})
export class ListaResultadosBusquedaComponente {
  private sVistaRapida = inject(ServicioVistaRapida);
  private sCarrito = inject(ServicioCarrito);
  private router = inject(Router);

  @Input() resultados: Producto[] = [];

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
    this.sCarrito.agregarAlCarrito(p);
  }

  alNavegar(id: string) {
    this.router.navigate(['/producto', id]);
  }
}
