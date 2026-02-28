import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

/**
 * @file promociones.componente.ts
 * @description Sección de banners promocionales y medios de pago en la página de inicio.
 *
 * Cada banner navega a la categoría correspondiente al hacer clic en él o en su botón.
 */
@Component({
  selector: 'app-promociones',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="promotions-container">
      <h3>Banners y Promociones</h3>
      <div class="banners-grid">
        <div class="banner" style="background-image: url('https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=700&auto=format&fit=crop&q=80')" role="button" tabindex="0" (click)="irADetalle('MON-001')" (keydown.enter)="irADetalle('MON-001')">
          <div class="banner-content">
            <span class="banner-tag">Oferta especial</span>
            <h4>Monitores gaming<br>hasta 40% OFF</h4>
            <button class="banner-btn" (click)="$event.stopPropagation(); irADetalle('MON-001')">Ver oferta →</button>
          </div>
        </div>
        <div class="banner" style="background-image: url('https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&auto=format&fit=crop&q=80')" role="button" tabindex="0" (click)="irADetalle('TEC-001')" (keydown.enter)="irADetalle('TEC-001')">
          <div class="banner-content">
            <span class="banner-tag">Envío gratis</span>
            <h4>Accesorios &amp; periféricos<br>en compras +$99</h4>
            <button class="banner-btn" (click)="$event.stopPropagation(); irADetalle('TEC-001')">Explorar →</button>
          </div>
        </div>
      </div>

      <div class="trust-section">
        <p class="trust-title">Confianza y medios de pago</p>
        <div class="trust-badges">
          <div class="pay-badge">💳 VISA</div>
          <div class="pay-badge">💳 Mastercard</div>
          <div class="pay-badge">🅿️ PayPal</div>
          <div class="pay-badge">🔒 SSL Seguro</div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .promotions-container {
      padding: 3rem 1rem 4rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    h3 {
      text-align: center;
      font-size: 1.75rem;
      font-weight: 800;
      margin-bottom: 2rem;
      color: var(--text-main);
    }
    .banners-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    .banner {
      position: relative;
      height: 220px;
      border-radius: var(--radius-xl);
      overflow: hidden;
      background-size: cover;
      background-position: center;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    .banner:hover { transform: scale(1.01); }
    .banner::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 100%);
    }
    .banner-content {
      position: absolute;
      bottom: 1.75rem;
      left: 2rem;
      color: white;
    }
    .banner-tag {
      display: inline-block;
      background: var(--primary);
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 0.75rem;
      letter-spacing: 0.05em;
    }
    .banner-content h4 {
      font-size: 1.35rem;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 0.75rem;
    }
    .banner-btn {
      background: white;
      color: var(--text-main);
      border: none;
      padding: 0.5rem 1.25rem;
      border-radius: var(--radius-lg);
      font-weight: 700;
      font-size: 0.85rem;
      cursor: pointer;
      font-family: inherit;
      transition: var(--transition);
    }
    .banner-btn:hover { background: var(--primary); color: white; }
    .trust-section { text-align: center; }
    .trust-title { font-size: 0.9rem; color: var(--text-muted); font-weight: 600; margin-bottom: 1rem; }
    .trust-badges { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
    .pay-badge {
      background: white;
      border: 1px solid var(--border);
      padding: 0.5rem 1.25rem;
      border-radius: var(--radius-lg);
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-main);
      box-shadow: var(--shadow-sm);
    }
    @media (max-width: 640px) { .banners-grid { grid-template-columns: 1fr; } }
  `]
})
export class ComponentePromociones {
  private router = inject(Router);

  irADetalle(id: string) {
    this.router.navigate(['/producto', id]);
  }
}
