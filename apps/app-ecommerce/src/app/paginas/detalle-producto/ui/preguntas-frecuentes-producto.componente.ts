import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preguntas-frecuentes-producto',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="faq-section">
      <h3>Preguntas frecuentes</h3>
      <div class="faq-list">
        <div class="faq-item" *ngFor="let i of [1,2,3]">
          <div class="question">
            <span>¿Cuánto dura la batería en este modelo?</span>
            <span class="toggle">+</span>
          </div>
          <div class="answer skeleton"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .faq-section {
      padding-top: 2rem;
    }
    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }
    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .faq-item {
      background: white;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      overflow: hidden;
    }
    .question {
      padding: 1.25rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      font-weight: 600;
      color: var(--text-main);
      transition: var(--transition);
    }
    .question:hover {
      background: var(--background);
    }
    .answer.skeleton {
      height: 4px;
      margin: 0 1.5rem 1.25rem;
      background: var(--border);
      border-radius: 2px;
      width: 80%;
    }
  `]
})
export class PreguntasFrecuentesProductoComponente { }
