import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRODUCTOS_EJEMPLO, Producto } from '../../../nucleo/datos-productos';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sugerencias-busqueda',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="suggestions-section">
      <div class="header">
        <span class="icon">✨</span>
        <h3>También buscaron</h3>
      </div>
      
      <div class="suggestions-grid">
        <a [routerLink]="['/producto', p.id]" class="suggestion-card" *ngFor="let p of sugerencias">
          <div class="img-wrapper">
            <img [src]="p.imagen" [alt]="p.nombre" class="suggestion-img" />
            <div class="overlay">Ver detalle</div>
          </div>
          <div class="suggestion-info">
            <span class="category">{{ p.categoria }}</span>
            <h4>{{ p.nombre }}</h4>
            <div class="prices">
              <span class="price">{{ '$' + p.precio.toLocaleString() }}</span>
              <span class="old" *ngIf="p.precioAnterior">{{ '$' + p.precioAnterior.toLocaleString() }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .suggestions-section {
      margin-top: 4rem;
      padding-top: 3rem;
      border-top: 1px solid var(--border);
    }
    .header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 2rem;
    }
    .header .icon { font-size: 1.5rem; }
    .header h3 {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--text-main);
    }
    .suggestions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 2rem;
    }
    .suggestion-card {
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: var(--transition);
    }
    .suggestion-card:hover { transform: translateY(-4px); }
    .img-wrapper {
      aspect-ratio: 1;
      border-radius: var(--radius-xl);
      overflow: hidden;
      background: var(--background);
      border: 1px solid var(--border);
      position: relative;
    }
    .suggestion-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .suggestion-card:hover .suggestion-img { transform: scale(1.1); }
    .overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 0.875rem;
      opacity: 0;
      transition: var(--transition);
      backdrop-filter: blur(4px);
    }
    .suggestion-card:hover .overlay { opacity: 1; }
    .suggestion-info { display: flex; flex-direction: column; gap: 0.25rem; }
    .category {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--primary);
    }
    .suggestion-info h4 {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text-main);
    }
    .prices { display: flex; gap: 0.5rem; align-items: baseline; }
    .price { font-weight: 800; font-size: 1.1rem; }
    .old { font-size: 0.85rem; color: var(--text-muted); text-decoration: line-through; }
  `]
})
export class SugerenciasBusquedaComponente implements OnInit {
  sugerencias: Producto[] = [];

  ngOnInit() {
    this.sugerencias = [...PRODUCTOS_EJEMPLO].sort(() => 0.5 - Math.random()).slice(0, 4);
  }
}
