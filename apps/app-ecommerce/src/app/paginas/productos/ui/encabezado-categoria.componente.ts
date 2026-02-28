import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-encabezado-categoria',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="category-header">
      <div class="header-top">
        <a routerLink="/" class="home-link" title="Volver al inicio">
          <span class="icon">🏠</span>
        </a>
        <div class="title-section">
          <h1>{{ nombreCategoria }}</h1>
          <span class="results-count">{{ conteoResultados }} resultados encontrados</span>
        </div>
      </div>
      
    </header>
  `,
  styles: [`
    .category-header {
      padding: 2rem 1rem;
      background: white;
      border-radius: var(--radius-xl);
      margin: 1rem;
      box-shadow: var(--shadow-sm);
    }
    .header-top {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .home-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background: var(--primary-light);
      border-radius: 50%;
      text-decoration: none;
      font-size: 1.5rem;
      transition: var(--transition);
    }
    .home-link:hover {
      background: var(--primary);
      transform: scale(1.1);
    }
    .home-link:hover .icon {
      filter: brightness(0) invert(1);
    }
    .title-section h1 {
      font-size: 2.25rem;
      font-weight: 700;
      color: var(--text-main);
      margin: 0;
    }
    .results-count {
      color: var(--text-muted);
      font-size: 0.875rem;
    }
    .tool-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: var(--background);
      border-radius: var(--radius-lg);
    }
    .tool-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .tool-label {
      font-weight: 500;
      color: var(--text-muted);
      font-size: 0.875rem;
    }
    .custom-select {
      padding: 0.5rem 1rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      background: white;
      outline: none;
      cursor: pointer;
    }
    .pagination {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-weight: 500;
      font-size: 0.875rem;
    }
    .page-btn {
      background: white;
      border: 1px solid var(--border);
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: var(--transition);
    }
    .page-btn:hover {
      border-color: var(--primary);
      color: var(--primary);
    }
  `]
})
export class EncabezadoCategoriaComponente {
  @Input() nombreCategoria = 'Categoría';
  @Input() conteoResultados = 1000;
}
