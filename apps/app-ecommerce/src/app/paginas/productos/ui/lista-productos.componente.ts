import { Component, signal, computed, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PRODUCTOS_EJEMPLO, Producto } from '../../../nucleo/datos-productos';
import { ServicioCarrito } from '../../../nucleo/servicios/carrito.servicio';
import { ServicioVistaRapida } from '../../../nucleo/servicios/vista-rapida.servicio';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="lista-container">
      <div class="lista-toolbar">
        <span class="count">{{ productosFiltrados().length }} productos</span>
        <select [(ngModel)]="ordenar" (ngModelChange)="aplicarOrden($event)" class="sort-select">
          <option value="">Ordenar por</option>
          <option value="precio-asc">Precio: Menor a Mayor</option>
          <option value="precio-desc">Precio: Mayor a Menor</option>
          <option value="nombre">Nombre A-Z</option>
          <option value="estrellas">Mejor valorados</option>
        </select>
      </div>
      <div class="product-list">
        <div class="product-item" *ngFor="let prod of productosFiltrados()">
          <div class="product-image">
            <img [src]="prod.imagen" [alt]="prod.nombre" class="prod-img" />
            <div class="promo-badge" *ngIf="prod.enOferta">Oferta</div>
          </div>
          <div class="product-details">
            <h3>{{ prod.nombre }}</h3>
            <span class="ref">REF: {{ prod.codigo }}</span>
            <div class="attrs">
              <span class="attr" *ngFor="let a of prod.atributos.slice(0,2)">{{ a }}</span>
            </div>
            <div class="stock">
              <span class="dot" [class.in]="prod.enStock"></span>
              {{ prod.enStock ? 'En stock' : 'Sin stock' }}
            </div>
          </div>
          <div class="product-pricing">
            <div>
              <span class="old" *ngIf="prod.precioAnterior">{{ '$' + prod.precioAnterior.toLocaleString() }}</span>
              <span class="price">{{ '$' + prod.precio.toLocaleString() }}</span>
            </div>
            <div class="actions">
              <button class="btn btn-secondary" (click)="alVistaRapida(prod)">Vista rápida</button>
              <button class="btn btn-primary" (click)="alAnadir(prod)">Añadir</button>
            </div>
          </div>
        </div>
        <div class="empty" *ngIf="productosFiltrados().length === 0">
          <span>🔍</span><p>No hay productos con estos filtros</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .lista-container { flex: 1; padding: 1rem; }
    .lista-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .count { color: var(--text-muted); font-size: 0.9rem; }
    .sort-select { padding: 0.5rem 1rem; border: 1px solid var(--border); border-radius: var(--radius-lg); background: white; font-family: inherit; font-size: 0.9rem; cursor: pointer; }
    .product-list { display: flex; flex-direction: column; gap: 1rem; }
    .product-item { display: flex; align-items: center; padding: 1.25rem; background: white; border-radius: var(--radius-xl); border: 1px solid var(--border); gap: 1.5rem; transition: var(--transition); }
    .product-item:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); border-color: var(--primary); }
    .product-image { width: 110px; height: 110px; border-radius: var(--radius-lg); overflow: hidden; position: relative; flex-shrink: 0; background: var(--background); }
    .prod-img { width: 100%; height: 100%; object-fit: cover; }
    .promo-badge { position: absolute; top: 0.4rem; right: 0.4rem; background: #fef2f2; color: #ef4444; padding: 0.15rem 0.5rem; border-radius: 999px; font-size: 0.7rem; font-weight: 700; }
    .product-details { flex: 1; display: flex; flex-direction: column; gap: 0.35rem; }
    h3 { font-size: 1rem; font-weight: 700; }
    .ref { font-size: 0.75rem; color: var(--text-muted); }
    .attrs { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .attr { background: var(--background); border: 1px solid var(--border); padding: 0.1rem 0.5rem; border-radius: 4px; font-size: 0.7rem; color: var(--text-muted); }
    .stock { display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; }
    .dot { width: 7px; height: 7px; border-radius: 50%; background: #f59e0b; }
    .dot.in { background: #10b981; }
    .product-pricing { text-align: right; min-width: 140px; display: flex; flex-direction: column; gap: 0.75rem; }
    .old { display: block; font-size: 0.8rem; color: var(--text-muted); text-decoration: line-through; }
    .price { font-size: 1.5rem; font-weight: 800; }
    .actions { display: flex; flex-direction: column; gap: 0.5rem; }
    .actions .btn { font-size: 0.8rem; }
    .empty { text-align: center; padding: 4rem; color: var(--text-muted); }
    .empty span { font-size: 3rem; display: block; margin-bottom: 1rem; }
  `]
})
export class ListaProductosComponente {
  private sCarrito = inject(ServicioCarrito);
  private sVistaRapida = inject(ServicioVistaRapida);

  @Input() set productos(val: Producto[]) {
    this._productos.set(val);
  }

  ordenar = '';
  private _productos = signal<Producto[]>([]);

  productosFiltrados = computed(() => this._productos());

  aplicarOrden(val: string) {
    this._productos.update(list => {
      const copia = [...list];
      if (val === 'precio-asc') copia.sort((a, b) => a.precio - b.precio);
      else if (val === 'precio-desc') copia.sort((a, b) => b.precio - a.precio);
      else if (val === 'nombre') copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
      else if (val === 'estrellas') copia.sort((a, b) => b.estrellas - a.estrellas);
      return copia;
    });
  }

  alVistaRapida(prod: Producto) {
    this.sVistaRapida.abrir({
      id: prod.id,
      nombre: prod.nombre,
      codigo: prod.codigo,
      precio: prod.precio,
      imagen: prod.imagen,
      enOferta: prod.enOferta
    });
  }
  alAnadir(prod: Producto) {
    this.sCarrito.agregarAlCarrito({ id: prod.id, nombre: prod.nombre, codigo: prod.codigo, precio: prod.precio, imagen: prod.imagen });
  }
}
