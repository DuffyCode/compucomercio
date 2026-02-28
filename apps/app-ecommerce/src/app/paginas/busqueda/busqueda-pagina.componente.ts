import { Component, inject, signal, computed, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PRODUCTOS_EJEMPLO, Producto } from '../../nucleo/datos-productos';
import { EncabezadoBusquedaComponente } from './ui/encabezado-busqueda.componente';
import { ChipsBusquedaComponente } from './ui/chips-busqueda.componente';
import { BarraLateralDestacadosComponente } from './ui/barra-lateral-destacados.componente';
import { ListaResultadosBusquedaComponente } from './ui/lista-resultados-busqueda.componente';
import { SugerenciasBusquedaComponente } from './ui/sugerencias-busqueda.componente';

/**
 * @file busqueda-pagina.componente.ts
 * @description Página de resultados de búsqueda.
 *
 * Al igual que el inicio, este componente es un orquestador que combina
 * varios sub-componentes especializados en una sola pantalla:
 *
 * - `app-encabezado-busqueda`          → Barra de búsqueda con el término activo
 * - `app-barra-lateral-destacados`     → Sidebar con productos destacados / recomendados
 * - `app-chips-busqueda`               → Filtros rápidos: historial, orden y ofertas
 * - `app-lista-resultados-busqueda`    → Grid con los resultados encontrados
 * - `app-sugerencias-busqueda`         → Búsquedas relacionadas al final de la página
 */
@Component({
  selector: 'app-pagina-busqueda',
  standalone: true,
  imports: [
    CommonModule,
    EncabezadoBusquedaComponente,
    ChipsBusquedaComponente,
    BarraLateralDestacadosComponente,
    ListaResultadosBusquedaComponente,
    SugerenciasBusquedaComponente
  ],
  template: `
    <div class="search-page">
      <app-encabezado-busqueda 
        [initialTerm]="termino()"
        (busqueda)="actualizarTermino($event)"
        (guardarBusqueda)="alGuardarBusqueda($event)">
      </app-encabezado-busqueda>
      
      <div class="search-content">
        <div class="container main-layout">
          <app-barra-lateral-destacados></app-barra-lateral-destacados>
          
          <div class="results-column">
            <app-chips-busqueda
              #chipsComponent
              [initialOrden]="orden()"
              [initialSoloOfertas]="soloOfertas()"
              (busqueda)="actualizarTermino($event)"
              (cambioOrden)="actualizarOrden($event)"
              (cambioOfertas)="actualizarOfertas($event)">
            </app-chips-busqueda>
            
            <app-lista-resultados-busqueda [resultados]="resultadosFiltrados()"></app-lista-resultados-busqueda>
          </div>
        </div>
        
        <div class="container">
          <app-sugerencias-busqueda></app-sugerencias-busqueda>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-page {
      min-height: 100vh;
      background: var(--background);
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    .main-layout {
      display: flex;
      gap: 2rem;
      padding-top: 2rem;
    }
    .results-column {
      flex: 1;
    }
    .search-content {
      padding-bottom: 4rem;
    }
  `]
})
export class PaginaBusqueda implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  @ViewChild('chipsComponent') chips!: ChipsBusquedaComponente;

  termino = signal('');
  orden = signal('Relevancia');
  soloOfertas = signal(false);

  resultadosFiltrados = computed(() => {
    let prods = [...PRODUCTOS_EJEMPLO];
    const q = this.termino().toLowerCase().trim();

    if (q) {
      const palabras = q.split(/\s+/);
      prods = prods.filter(p => {
        const textoBusqueda = `${p.nombre} ${p.codigo} ${p.categoria} ${p.marca}`.toLowerCase();
        return palabras.every(palabra => textoBusqueda.includes(palabra));
      });
    }

    if (this.soloOfertas()) {
      prods = prods.filter(p => p.enOferta);
    }

    const o = this.orden();
    if (o === 'Precio: Menor a Mayor') prods.sort((a, b) => a.precio - b.precio);
    else if (o === 'Precio: Mayor a Menor') prods.sort((a, b) => b.precio - a.precio);
    else if (o === 'Más vendidos') prods.sort((a, b) => b.resenas - a.resenas);

    return prods;
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['q']) this.termino.set(params['q']);
      if (params['orden']) this.orden.set(params['orden']);
      if (params['ofertas']) this.soloOfertas.set(params['ofertas'] === 'true');
    });
  }

  actualizarTermino(nuevo: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: nuevo },
      queryParamsHandling: 'merge'
    });
  }

  actualizarOrden(nuevo: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { orden: nuevo },
      queryParamsHandling: 'merge'
    });
  }

  actualizarOfertas(nuevo: boolean) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ofertas: nuevo || null },
      queryParamsHandling: 'merge'
    });
  }

  alGuardarBusqueda(termino: string) {
    this.chips.alBuscar(termino);
  }
}
