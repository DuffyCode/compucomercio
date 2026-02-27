import { Component, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-barra-lateral-filtros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <aside class="filter-sidebar">
      <div class="sidebar-header">
        <h3>Filtros</h3>
        <button class="clear-all" (click)="limpiar()">Limpiar</button>
      </div>
      <div class="filter-sections">
      <div class="filter-group">
        <h4>CATEGORÍAS</h4>
        <div class="filter-options">
          <button class="filter-btn" [class.active]="!categoriaActiva()" (click)="seleccionarCategoria(null)">
            Todos
          </button>
          <button 
            *ngFor="let cat of categorias" 
            class="filter-btn" 
            [class.active]="categoriaActiva() === cat"
            (click)="seleccionarCategoria(cat)"
          >
            {{ cat }}
          </button>
        </div>
      </div>
        <div class="filter-group">
          <h4>MARCAS</h4>
          <div class="filter-options">
            <button 
              *ngFor="let marca of marcas" 
              class="filter-btn" 
              [class.active]="marcaActiva() === marca"
              (click)="seleccionarMarca(marca)"
            >
              {{ marca }}
            </button>
          </div>
        </div>
        <div class="filter-group">
          <h4>RANGO DE PRECIO</h4>
          <div class="price-display">Hasta <span class="currency">$</span>{{ precioMax() }}</div>
          <input type="range" class="price-slider" min="50" max="2500" step="50"
            [value]="precioMax()" (input)="alCambiarPrecio(+$any($event.target).value)" />
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .filter-sidebar { width: 260px; padding: 1.5rem; background: white; border-radius: var(--radius-xl); margin: 1rem; box-shadow: var(--shadow-sm); height: fit-content; position: sticky; top: 5rem; }
    .sidebar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    h3 { font-size: 1.1rem; font-weight: 700; color: var(--text-main); }
    .clear-all { background: none; border: none; color: var(--primary); font-size: 0.875rem; font-weight: 500; cursor: pointer; }
    .filter-sections { display: flex; flex-direction: column; gap: 2rem; }
    .filter-group h4 { font-size: 0.75rem; color: var(--text-muted); letter-spacing: 0.1em; margin-bottom: 1rem; }
    .filter-options { display: flex; flex-direction: column; gap: 0.25rem; }
    .filter-btn { 
      padding: 0.6rem 1rem; border: none; background: none; text-align: left; 
      border-radius: var(--radius-lg); cursor: pointer; color: var(--text-main); 
      font-size: 0.95rem; font-weight: 500; transition: var(--transition);
    }
    .filter-btn:hover { background: var(--background); color: var(--primary); }
    .filter-btn.active { background: var(--primary-light); color: var(--primary); font-weight: 700; }
    .filter-btn:active { transform: scale(0.98); }
    .price-slider { width: 100%; accent-color: var(--primary); cursor: pointer; margin-top: 0.5rem; }
    .price-display { font-weight: 700; font-size: 1.1rem; color: var(--text-main); }
  `]
})
export class BarraLateralFiltrosComponente {
  @Output() cambioCategoria = new EventEmitter<string | null>();
  @Output() cambioMarca = new EventEmitter<string | null>();
  @Output() cambioPrecioMax = new EventEmitter<number>();

  categorias = ['Laptops', 'Monitores', 'Teclados', 'Accesorios'];
  marcas = ['Predator', 'Razer', 'Logitech', 'Apple', 'Samsung'];

  categoriaActiva = signal<string | null>(null);
  marcaActiva = signal<string | null>(null);
  precioMax = signal(2500);

  seleccionarCategoria(cat: string | null) {
    const nuevo = this.categoriaActiva() === cat ? null : cat;
    this.categoriaActiva.set(nuevo);
    this.cambioCategoria.emit(nuevo);
  }
  seleccionarMarca(marca: string) {
    const nuevo = this.marcaActiva() === marca ? null : marca;
    this.marcaActiva.set(nuevo);
    this.cambioMarca.emit(nuevo);
  }
  alCambiarPrecio(valor: number) {
    this.precioMax.set(valor);
    this.cambioPrecioMax.emit(valor);
  }
  limpiar() {
    this.categoriaActiva.set(null);
    this.marcaActiva.set(null);
    this.precioMax.set(2500);
    this.cambioCategoria.emit(null);
    this.cambioMarca.emit(null);
    this.cambioPrecioMax.emit(2500);
  }
}
