import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServicioPago } from '../../../nucleo/servicios/pago.servicio';
import { ServicioCarrito } from '../../../nucleo/servicios/carrito.servicio';

/**
 * Componente para confirmar la dirección y el método de envío.
 */
@Component({
  selector: 'app-pago-confirmar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="step-container">
      <section class="address-section">
        <h3>Dirección guardada</h3>
        <div class="address-box">
          <div class="user-avatar">👤</div>
          <div class="address-details">
            <span class="user-name">{{ sPago.direccion().nombre }}</span>
            <p>{{ sPago.direccion().calle }}<br>{{ sPago.direccion().ciudad }}, {{ sPago.direccion().estado }} {{ sPago.direccion().codigoPostal }}</p>
            <span class="phone">{{ sPago.direccion().telefono }}</span>
          </div>
          <button class="change-btn">Cambiar</button>
        </div>
        <button class="btn btn-outline full-width" (click)="alPasoAnterior()">Ver pedido</button>
      </section>

      <section class="shipping-methods">
        <div class="method-card" 
             *ngFor="let m of sPago.metodosEnvioDisponibles()"
             [class.active]="sPago.metodoEnvioSeleccionado().id === m.id"
             (click)="sPago.establecerMetodoEnvio(m.id)">
          <div class="method-info">
            <span class="name">{{ m.nombre }}</span>
            <span class="date">{{ m.fechaEntrega }}</span>
          </div>
          <div class="method-price">
            <span>{{ m.precio | currency }}</span>
            <span class="arrow">></span>
          </div>
        </div>
      </section>

      <section class="upsell-section">
        <h3>Seguir comprando</h3>
        <div class="recommended-grid">
          <div class="rec-card" *ngFor="let i of [1,2,3]">
            <div class="rec-image"></div>
            <button class="btn btn-outline sm-btn" (click)="alAgregarRecomendado(i)">Añadir</button>
          </div>
        </div>
      </section>

      <div class="action-row">
        <button class="btn btn-primary full-width" (click)="alSiguientePaso()">Confirmar y seguir</button>
      </div>
    </div>
  `,
  styles: [`
    .step-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    h3 { font-size: 1.1rem; font-weight: 800; margin-bottom: 1rem; }

    section {
      padding: 1.25rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      background: white;
    }

    .address-box {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      position: relative;
      margin-bottom: 1rem;
    }

    .user-avatar {
      width: 48px;
      height: 48px;
      background: var(--background);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .address-details { font-size: 0.85rem; color: var(--text-muted); }
    .user-name { font-weight: 700; color: var(--text-main); display: block; margin-bottom: 0.25rem; }

    .change-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      color: var(--text-main);
      text-decoration: underline;
      font-size: 0.8rem;
      cursor: pointer;
    }

    .full-width { width: 100%; }

    .shipping-methods {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      border: none;
      padding: 0;
    }

    .method-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      background: white;
      cursor: pointer;
      transition: var(--transition);
    }

    .method-card:hover { border-color: var(--primary); }
    .method-card.active { border-color: black; border-width: 2px; }

    .method-info { display: flex; flex-direction: column; gap: 0.25rem; }
    .method-info .name { font-weight: 700; }
    .method-info .date { font-size: 0.8rem; color: var(--text-muted); }

    .method-price { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; }
    .arrow { color: var(--border); }

    .recommended-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }

    .rec-card {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .rec-image {
      aspect-ratio: 1;
      background: var(--background);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
    }

    .sm-btn { padding: 0.25rem; font-size: 0.75rem; font-weight: 700; }
  `]
})
export class ComponenteConfirmarPago implements OnInit {
  sPago = inject(ServicioPago);
  sCarrito = inject(ServicioCarrito);
  router = inject(Router);

  ngOnInit() {
    this.sPago.establecerPaso(2);
  }

  alPasoAnterior() {
    this.router.navigate(['/pago/paso-1']);
  }

  alSiguientePaso() {
    this.router.navigate(['/pago/paso-3']);
  }

  alAgregarRecomendado(id: number) {
    this.sCarrito.agregarAlCarrito({
      id: 'REC-' + id,
      nombre: 'Accesorio Extra ' + id,
      precio: 15.00
    });
  }
}
