import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-barra-categorias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="category-nav">
      <ul class="category-list">
        <li [routerLink]="['/categoria', 'Laptops']" routerLinkActive="active">Laptops</li>
        <li [routerLink]="['/categoria', 'Monitores']" routerLinkActive="active">Monitores</li>
        <li [routerLink]="['/categoria', 'Teclados']" routerLinkActive="active">Teclados</li>
        <li [routerLink]="['/categoria', 'Accesorios']" routerLinkActive="active">Accesorios</li>
        <li [routerLink]="['/categoria', 'Ofertas']" routerLinkActive="active" class="sale-item">Ofertas</li>
      </ul>
    </nav>
  `,
  styles: [`
    .category-nav {
      background: white;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 10;
    }
    .category-list {
      list-style: none;
      display: flex;
      justify-content: center;
      gap: 2.5rem;
      padding: 0;
      margin: 0;
    }
    li {
      cursor: pointer;
      font-weight: 500;
      color: var(--text-muted);
      font-size: 0.9375rem;
      transition: var(--transition);
      position: relative;
      padding: 0.25rem 0;
    }
    li::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--primary);
      transition: var(--transition);
    }
    li:hover, li.active {
      color: var(--primary);
    }
    li:hover::after, li.active::after {
      width: 100%;
    }
    .sale-item {
      color: #ef4444 !important;
    }
    .sale-item::after {
      background: #ef4444;
    }
  `]
})
export class BarraCategoriasComponente { }
