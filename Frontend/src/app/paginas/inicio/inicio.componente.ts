/**
 * @file inicio.componente.ts
 * @description Página de inicio (Home) de la tienda.
 *
 * Este componente es un orquestador puro: su única responsabilidad es
 * componer los sub-componentes de la pantalla de inicio en el orden correcto.
 * Toda la lógica de negocio vive en cada sub-componente:
 *
 * - `app-hero`                 → Banner principal con CTA y fondo animado
 * - `app-barra-categorias`     → Chips de navegación por categoría
 * - `app-barra-busqueda`       → Campo de búsqueda con sugerencias
 * - `app-cuadricula-productos` → Grid de productos destacados con filtros
 * - `app-promociones`          → Banners de ofertas y promoción cruzada
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponenteHero } from './ui/hero.componente';
import { BarraCategoriasComponente } from './ui/barra-categorias.componente';
import { BarraBusquedaComponente } from './ui/barra-busqueda.componente';
import { CuadriculaProductosComponente } from './ui/cuadricula-productos.componente';
import { ComponentePromociones } from './ui/promociones.componente';

@Component({
  selector: 'app-pagina-inicio',
  standalone: true,
  imports: [
    CommonModule,
    ComponenteHero,
    BarraCategoriasComponente,
    BarraBusquedaComponente,
    CuadriculaProductosComponente,
    ComponentePromociones
  ],
  template: `
    <div class="home-page">
      <app-hero></app-hero>
      <app-barra-categorias></app-barra-categorias>
      <app-barra-busqueda></app-barra-busqueda>
      <app-cuadricula-productos></app-cuadricula-productos>
      <app-promociones></app-promociones>
    </div>
  `,
  styles: [`
    .home-page {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  `]
})
export class PaginaInicio { }
