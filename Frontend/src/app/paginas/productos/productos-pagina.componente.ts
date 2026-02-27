import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PRODUCTOS_EJEMPLO, Producto } from '../../nucleo/datos-productos';
import { EncabezadoCategoriaComponente } from './ui/encabezado-categoria.componente';
import { BarraLateralFiltrosComponente } from './ui/barra-lateral-filtros.componente';
import { ListaProductosComponente } from './ui/lista-productos.componente';
import { ComponentePromociones } from '../inicio/ui/promociones.componente';

/**
 * @file productos-pagina.componente.ts
 * @description Página de listado de productos filtrados por categoría.
 *
 * Se activa en la ruta `/categoria/:id`. El parámetro `:id` puede ser
 * el nombre de una categoría (ej. 'Laptops') o de una marca (ej. 'Razer'),
 * y se pasa al componente `app-encabezado-categoria` para mostrar el título.
 *
 * Sub-componentes:
 * - `app-encabezado-categoria`    → Título y breadcrumb de la categoría
 * - `app-barra-lateral-filtros`   → Filtros por precio, marca, disponibilidad
 * - `app-lista-productos`         → Grid de productos con opción de vista rápida
 * - `app-promociones`             → Banners de promoción reutilizados del inicio
 */
@Component({
  selector: 'app-pagina-productos',
  standalone: true,
  imports: [
    CommonModule,
    EncabezadoCategoriaComponente,
    BarraLateralFiltrosComponente,
    ListaProductosComponente,
    ComponentePromociones
  ],
  template: `
    <div class="products-page">
      <app-encabezado-categoria [nombreCategoria]="nombreCategoria()"></app-encabezado-categoria>
      
      <div class="main-content">
        <app-barra-lateral-filtros 
          (cambioCategoria)="categoriaManual.set($event)"
          (cambioMarca)="marcaFiltro.set($event)"
          (cambioPrecioMax)="precioMax.set($event)">
        </app-barra-lateral-filtros>
        <div class="results-area">
          <app-lista-productos [productos]="productosFiltrados()"></app-lista-productos>
        </div>
      </div>
      
      <app-promociones></app-promociones>
    </div>
  `,
  styles: [`
    .products-page {
      display: flex;
      flex-direction: column;
    }
    .main-content {
      display: flex;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }
    .results-area {
      flex: 1;
    }
  `]
})
export class PaginaProductos implements OnInit {
  private route = inject(ActivatedRoute);

  nombreCategoria = signal('Categoría');
  categoriaManual = signal<string | null>(null);
  marcaFiltro = signal<string | null>(null);
  precioMax = signal(2500);

  productosFiltrados = computed(() => {
    let prods = [...PRODUCTOS_EJEMPLO];
    const catUrl = this.nombreCategoria();
    const catFiltro = this.categoriaManual();
    const marca = this.marcaFiltro();
    const precio = this.precioMax();

    // Filtrar por categoría (URL o filtro manual)
    const categoriaFinal = catFiltro || catUrl;
    if (categoriaFinal &&
      categoriaFinal !== 'Categoría' &&
      categoriaFinal !== 'Ofertas' &&
      categoriaFinal !== 'Todos') {
      prods = prods.filter(p => p.categoria.toLowerCase() === categoriaFinal.toLowerCase());
    }

    // Filtro especial de ofertas
    if (catUrl === 'Ofertas') {
      prods = prods.filter(p => p.enOferta);
    }

    // Filtrar por marca
    if (marca) {
      prods = prods.filter(p => p.marca.toLowerCase() === marca.toLowerCase());
    }

    // Filtrar por precio
    prods = prods.filter(p => p.precio <= precio);

    return prods;
  });

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.nombreCategoria.set(params['id'] || 'Categoría');
    });
  }
}
