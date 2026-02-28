import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../nucleo/datos-productos';

@Component({
  selector: 'app-caracteristicas-producto',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="features-container">
      <div class="feature-section">
        <h3>Resumen</h3>
        <ul>
          <li>Envío gratis disponible</li>
          <li>Devolución en 30 días</li>
          <li>2 años de garantía</li>
          <li *ngFor="let attr of producto.atributos">{{ attr }}</li>
        </ul>
      </div>
      
      <div class="feature-section">
        <h3>Especificaciones</h3>
        <div class="specs-grid">
          <div class="spec-row">
            <span class="spec-label">Marca</span>
            <span class="spec-value">{{ producto.marca }}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Categoría</span>
            <span class="spec-value">{{ producto.categoria }}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Referencia</span>
            <span class="spec-value">{{ producto.codigo }}</span>
          </div>
          <div class="spec-row" *ngIf="producto.precioAnterior">
            <span class="spec-label">Descuento</span>
            <span class="spec-value">Ahorra {{ (producto.precioAnterior - producto.precio) | currency }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .features-container {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }
    .feature-section h3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 1.25rem;
      color: var(--text-main);
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--primary-light);
      display: inline-block;
    }
    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    li::before {
      content: "•";
      color: var(--primary);
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
    .specs-grid {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .spec-row {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border);
    }
    .spec-label {
      color: var(--text-muted);
      font-weight: 500;
    }
    .spec-value {
      font-weight: 600;
      color: var(--text-main);
    }
  `]
})
export class CaracteristicasProductoComponente {
  @Input({ required: true }) producto!: Producto;
}
