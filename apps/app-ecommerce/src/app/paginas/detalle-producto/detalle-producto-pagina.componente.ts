import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PRODUCTOS_EJEMPLO, Producto } from '../../nucleo/datos-productos';
import { GaleriaProductosComponente } from './ui/galeria-productos.componente';
import { InformacionProductoComponente } from './ui/informacion-producto.componente';
import { CaracteristicasProductoComponente } from './ui/caracteristicas-producto.componente';
import { ResenasProductoComponente } from './ui/resenas-producto.componente';
import { PreguntasFrecuentesProductoComponente } from './ui/preguntas-frecuentes-producto.componente';
import { ProductosRelacionadosComponente } from './ui/productos-relacionados.componente';

/**
 * @file detalle-producto-pagina.componente.ts
 * @description Página de detalle completo de un producto.
 *
 * Se activa en la ruta `/producto/:id`. Busca el producto por ID en `PRODUCTOS_EJEMPLO`;
 * si no lo encuentra, muestra el primer producto del catálogo como fallback.
 * Al cambiar de producto (ngOnInit reacciona a params) hace scroll al tope de la página.
 *
 * Sub-componentes:
 * - `app-galeria-productos`             → Imágenes del producto con navegación
 * - `app-informacion-producto`          → Precio, calificación, variantes y botón de compra
 * - `app-caracteristicas-producto`      → Tabla de especificaciones técnicas
 * - `app-resenas-producto`              → Puntuación y listado de reseñas
 * - `app-preguntas-frecuentes-producto` → FAQ del producto en acordeones
 * - `app-productos-relacionados`        → Carrusel de productos de la misma categoría
 */
@Component({
  selector: 'app-pagina-detalle-producto',
  standalone: true,
  imports: [
    CommonModule,
    GaleriaProductosComponente,
    InformacionProductoComponente,
    CaracteristicasProductoComponente,
    ResenasProductoComponente,
    PreguntasFrecuentesProductoComponente,
    ProductosRelacionadosComponente
  ],
  template: `
    <article class="product-page" *ngIf="producto(); else loading">
      <div class="product-detail-page">
        <div class="container">
          <div class="header-actions" *ngIf="mostrarBotonRegresar()">
             <button class="back-pill" (click)="regresar()">
               <span class="icon">←</span> Regresar
             </button>
          </div>
          <div class="product-top-row">
            <div class="gallery-col">
              <app-galeria-productos [imagenes]="[producto()!.imagen, producto()!.imagen, producto()!.imagen]"></app-galeria-productos>
            </div>
            <div class="info-col">
              <app-informacion-producto 
                [producto]="producto()!" 
                [soloLectura]="esSoloLectura()">
              </app-informacion-producto>
            </div>
          </div>

          <div class="product-details-tabs">
            <app-caracteristicas-producto [producto]="producto()!"></app-caracteristicas-producto>
            <app-resenas-producto [estrellas]="producto()!.estrellas" [resenas]="producto()!.resenas"></app-resenas-producto>
            <app-preguntas-frecuentes-producto></app-preguntas-frecuentes-producto>
          </div>

          <div class="related-section">
            <h3 class="section-title">También te puede interesar</h3>
            <app-productos-relacionados [categoria]="producto()!.categoria"></app-productos-relacionados>
          </div>
        </div>
      </div>
    </article>

    <ng-template #loading>
       <div class="loading-state">Cargando producto...</div>
    </ng-template>
  `,
  styles: [`
    .product-page {
      padding-top: 3rem;
      padding-bottom: 6rem;
      background: white;
    }
    .container {
      max-width: 1300px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    .header-actions { margin-bottom: 2rem; }
    .back-pill {
      display: inline-flex; align-items: center; gap: 0.75rem;
      padding: 0.75rem 1.5rem; background: white; border: 1px solid var(--border);
      border-radius: 999px; font-weight: 700; color: var(--text-main);
      cursor: pointer; transition: var(--transition);
      box-shadow: var(--shadow-sm);
    }
    .back-pill:hover {
      border-color: var(--primary); color: var(--primary);
      transform: translateX(-5px); box-shadow: var(--shadow-md);
    }
    .product-top-row {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 5rem;
      margin-bottom: 5rem;
    }
    .product-details-tabs {
      margin-top: 5rem;
      display: flex;
      flex-direction: column;
      gap: 4rem;
    }
    .related-section {
      margin-top: 6rem;
      padding-top: 4rem;
      border-top: 1px solid var(--border);
    }
    .section-title {
      font-size: 1.75rem;
      font-weight: 800;
      margin-bottom: 2.5rem;
    }
    .loading-state {
      padding: 10rem;
      text-align: center;
      font-size: 1.25rem;
      color: var(--text-muted);
    }
    
    @media (max-width: 1024px) {
      .product-top-row {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }
  `]
})
export class PaginaDetalleProducto implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);

  producto = signal<Producto | null>(null);
  esSoloLectura = signal(false);
  mostrarBotonRegresar = signal(false);

  constructor() {
    const nav = this.router.getCurrentNavigation();
    const prevUrl = nav?.previousNavigation?.finalUrl?.toString();
    // No mostrar si viene del inicio o si no hay navegación previa
    this.mostrarBotonRegresar.set(!!prevUrl && prevUrl !== '/');
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.esSoloLectura.set(params['readonly'] === 'true');
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      const encontrado = PRODUCTOS_EJEMPLO.find(p => p.id === id);
      this.producto.set(encontrado || PRODUCTOS_EJEMPLO[0]);
      window.scrollTo(0, 0);
    });
  }

  regresar() {
    this.location.back();
  }
}
