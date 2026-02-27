import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

const deslizarY = trigger('deslizarY', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(40px)' }),
    animate('0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  animations: [deslizarY],
  template: `
    <section class="hero-container" @deslizarY>
      <div class="hero-bg"></div>
      <div class="hero-content">
        <span class="pre-title">Tecnología de Vanguardia</span>
        <h1>Descubre la era <span class="highlight">CompuComercio</span></h1>
        <p>Tu destino definitivo para hardware, software y estilo digital con envío express garantizado.</p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-large" (click)="scrollAProductos()">Comprar ahora</button>
          <button class="btn btn-outline btn-large" routerLink="/categoria/Todos"
            style="border-color: white; color: white;">Ver Catálogo</button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-container {
      position: relative;
      min-height: 580px;
      display: flex;
      align-items: center;
      overflow: hidden;
    }
    .hero-bg {
      position: absolute;
      inset: 0;
      background: url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&auto=format&fit=crop&q=80') center/cover no-repeat;
      filter: brightness(0.35);
      transform: scale(1.05);
      transition: transform 8s ease;
    }
    .hero-container:hover .hero-bg { transform: scale(1); }
    .hero-content {
      position: relative;
      max-width: 1200px;
      margin: 0 auto;
      padding: 5rem 2rem;
      color: white;
    }
    .pre-title {
      display: inline-block;
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #a5b4fc;
      margin-bottom: 1.25rem;
    }
    h1 {
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      font-weight: 900;
      line-height: 1.05;
      margin-bottom: 1.5rem;
      letter-spacing: -0.03em;
    }
    .highlight { color: #818cf8; }
    p {
      font-size: 1.2rem;
      color: #cbd5e1;
      max-width: 560px;
      margin-bottom: 2.5rem;
      line-height: 1.6;
    }
    .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
    .btn-large { padding: 1rem 2rem; font-size: 1.05rem; }
    .btn-outline {
      background: transparent;
      border: 2px solid;
      padding: 1rem 2rem;
      border-radius: var(--radius-xl);
      font-weight: 700;
      cursor: pointer;
      transition: var(--transition);
      font-size: 1.05rem;
      font-family: inherit;
    }
    .btn-outline:hover { background: rgba(255,255,255,0.1); }
  `]
})
export class ComponenteHero {
  scrollAProductos() {
    const el = document.getElementById('productos-destacados');
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}
