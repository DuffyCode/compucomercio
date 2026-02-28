import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-busqueda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-section">
      <div class="search-wrapper">
        <div class="search-input-group">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar tecnología, hardware o accesorios..." 
            [(ngModel)]="termino"
            (keyup.enter)="alBuscar()"
          />
          <button class="search-btn" (click)="alBuscar()">Buscar</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-section {
      padding: 2rem 1rem;
      display: flex;
      justify-content: center;
      background: white;
      border-bottom: 1px solid var(--border);
    }
    .search-wrapper {
      width: 100%;
      max-width: 800px;
    }
    .search-input-group {
      display: flex;
      align-items: center;
      background: var(--background);
      border: 2px solid transparent;
      border-radius: var(--radius-xl);
      padding: 0.5rem 0.5rem 0.5rem 1.5rem;
      transition: var(--transition);
    }
    .search-input-group:focus-within {
      background: white;
      border-color: var(--primary);
      box-shadow: 0 0 0 4px var(--primary-light);
    }
    .search-icon {
      font-size: 1.25rem;
      margin-right: 1rem;
      opacity: 0.5;
    }
    input {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      font-size: 1rem;
      color: var(--text-main);
      padding: 0.5rem 0;
    }
    .search-btn {
      background: var(--primary);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius-lg);
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition);
    }
    .search-btn:hover {
      background: var(--primary-hover);
    }
  `]
})
export class BarraBusquedaComponente {
  private router = inject(Router);
  termino = '';

  alBuscar() {
    this.router.navigate(['/busqueda'], { queryParams: { q: this.termino } });
  }
}
