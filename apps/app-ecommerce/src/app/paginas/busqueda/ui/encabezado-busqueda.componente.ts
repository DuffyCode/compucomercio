import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encabezado-busqueda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-header-container">
      <h1 class="page-title">Búsqueda</h1>
      
      <div class="search-box-wrapper">
        <div class="search-input-group">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar por producto o código" 
            class="search-input"
            [(ngModel)]="termino"
            (keyup.enter)="alBuscar()"
          />
          <button class="filter-icon" (click)="alBuscar()" aria-label="Buscar">➡️</button>
        </div>
        <div class="search-meta">
          <span class="stats">Mostrando 124 resultados - 0,12s</span>
          <button class="save-search" (click)="alGuardarBusqueda()">
            <span class="bookmark-icon">🔖</span> Guardar búsqueda
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-header-container {
      text-align: center;
      padding: 3rem 1rem 1rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .page-title {
      font-size: 3rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 2rem;
      letter-spacing: -0.02em;
    }
    .search-box-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .search-input-group {
      display: flex;
      align-items: center;
      background: white;
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: 0.75rem 1.5rem;
      box-shadow: var(--shadow-sm);
      transition: var(--transition);
    }
    .search-input-group:focus-within {
      border-color: var(--primary);
      box-shadow: 0 0 0 4px var(--primary-light);
    }
    .search-icon {
      font-size: 1.25rem;
      margin-right: 1rem;
      opacity: 0.5;
    }
    .search-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 1.125rem;
      color: var(--text-main);
    }
    .filter-icon {
      margin-left: 1rem;
      opacity: 0.3;
      cursor: pointer;
    }
    .search-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.5rem;
      font-size: 0.875rem;
      color: var(--text-muted);
    }
    .save-search {
      background: none;
      border: none;
      color: var(--text-main);
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.375rem;
      cursor: pointer;
      transition: var(--transition);
    }
    .save-search:hover {
      color: var(--primary);
    }
  `]
})
export class EncabezadoBusquedaComponente {
  @Input() set initialTerm(val: string) { this.termino = val; }
  @Output() busqueda = new EventEmitter<string>();
  @Output() guardarBusqueda = new EventEmitter<string>();

  termino = '';

  alBuscar() {
    this.busqueda.emit(this.termino);
  }

  alGuardarBusqueda() {
    if (this.termino.trim()) {
      this.guardarBusqueda.emit(this.termino);
    }
  }
}
