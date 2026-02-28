import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resenas-producto',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="reviews-section">
      <div class="section-header">
        <h3>Opiniones de clientes</h3>
        <div class="overall-rating">
          <span class="stars">
            <span *ngFor="let s of [1,2,3,4,5]; let i = index">{{ i < estrellas ? '★' : '☆' }}</span>
          </span>
          <span class="count">({{ resenas }} reseñas)</span>
        </div>
      </div>
      
      <div class="reviews-grid">
        <div class="review-card" *ngFor="let r of [1,2,3]">
          <div class="review-header">
            <span class="user-avatar">👤</span>
            <div class="user-info">
              <span class="username">Usuario Verificado</span>
              <span class="stars">★★★★★</span>
            </div>
          </div>
          <p class="review-text">Increíble producto, superó mis expectativas. La calidad es de otro nivel.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reviews-section {
      padding-top: 2rem;
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 2rem;
    }
    h3 {
      font-size: 1.5rem;
      font-weight: 700;
    }
    .stars {
      color: #f59e0b;
      font-size: 1.125rem;
    }
    .count {
      margin-left: 0.5rem;
      color: var(--text-muted);
      font-size: 0.875rem;
    }
    .reviews-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .review-card {
      background: white;
      padding: 1.5rem;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border);
    }
    .review-header {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .user-avatar {
      font-size: 2rem;
    }
    .user-info {
      display: flex;
      flex-direction: column;
    }
    .username {
      font-weight: 700;
      color: var(--text-main);
    }
    .review-text {
      color: var(--text-muted);
      font-size: 0.9375rem;
      line-height: 1.6;
    }
  `]
})
export class ResenasProductoComponente {
  @Input() estrellas = 5;
  @Input() resenas = 0;
}
