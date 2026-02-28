import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServicioCarrito } from '../../../nucleo/servicios/carrito.servicio';
import { ServicioPago } from '../../../nucleo/servicios/pago.servicio';
import { ServicioUsuario, Pedido } from '../../../nucleo/servicios/usuario.servicio';

/**
 * Componente final del proceso de pago.
 */
@Component({
  selector: 'app-pago-final',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="step-container">
      <section class="payment-header">
        <span class="step-badge">Paso 4 de 4</span>
        <h3>Revisión Final</h3>
        <p>Confirma que todos los datos son correctos antes de finalizar.</p>
        
        <div class="pay-item-preview">
          <div class="item-card">
            <span class="icon">🏠</span>
            <div class="details">
              <span class="name">Envío a domicilio</span>
              <span class="user-contact">{{ sPago.direccion().nombre }}</span>
              <p class="address">{{ sPago.direccion().calle }}, {{ sPago.direccion().ciudad }}</p>
              <button class="text-link" (click)="alEditarDireccion()">Editar envío</button>
            </div>
          </div>

          <div class="item-card">
            <span class="icon">💳</span>
            <div class="details">
              <span class="name">Método de pago</span>
              <span class="card-num">**** **** **** 4842</span>
              <span class="holder">Titular: {{ sPago.direccion().nombre }}</span>
              <button class="text-link" (click)="alEditarTarjeta()">Editar tarjeta</button>
            </div>
          </div>
        </div>
      </section>

      <section class="order-summary">
        <div class="section-title">
          <span>📦 Tu Pedido ({{ sCarrito.articulosActivos().length }} artículos)</span>
          <button class="text-link" (click)="alEditarCarrito()">Editar carrito</button>
        </div>
        
        <div class="summary-lines">
          <div class="line"><span>Subtotal</span><span>{{ sCarrito.subtotal() | currency }}</span></div>
          <div class="line"><span>Envío ({{ sPago.metodoEnvioSeleccionado().nombre }})</span><span>{{ sCarrito.envio() | currency }}</span></div>
          <div class="line"><span>Impuestos</span><span>{{ sCarrito.impuesto() | currency }}</span></div>
        </div>
        
        <div class="total-line">
          <span>Total Final</span>
          <span>{{ sCarrito.totalTotal() | currency }}</span>
        </div>
      </section>

      <div class="final-actions">
        <button class="btn btn-primary pay-btn" (click)="alPagar()">
          Finalizar Compra - {{ sCarrito.totalTotal() | currency }}
        </button>
        
        <div class="security-footer">
          <span>🛡️ Pago encriptado</span>
          <span>🔒 SSL Secure Connector</span>
          <span>✅ Garantía de Compra</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .step-container { display: flex; flex-direction: column; gap: 2rem; max-width: 700px; margin: 0 auto; }
    .step-badge {
      display: inline-block; padding: 0.2rem 0.75rem; background: var(--primary-light);
      color: var(--primary); border-radius: 999px; font-size: 0.7rem; font-weight: 800; margin-bottom: 0.75rem;
    }
    h3 { font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem; }
    p { color: var(--text-muted); margin-bottom: 2rem; }

    section { padding: 2.5rem; border: 1px solid var(--border); border-radius: var(--radius-2xl); background: white; box-shadow: var(--shadow-sm); }

    .pay-item-preview { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1rem; }
    .item-card { padding: 1.5rem; border: 1px solid var(--border); border-radius: var(--radius-xl); display: flex; gap: 1.25rem; background: #f8fafc; }
    .item-card .icon { 
      font-size: 1.5rem; width: 44px; height: 44px; background: white; 
      border: 1px solid var(--border); border-radius: var(--radius-lg);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }

    .details { display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.85rem; }
    .details .name { font-weight: 800; color: var(--text-main); font-size: 0.95rem; }
    .details .user-contact { font-weight: 600; }
    .details .address { color: var(--text-muted); }
    
    .text-link { 
      background: none; border: none; padding: 0; 
      color: var(--primary); text-decoration: underline; 
      cursor: pointer; text-align: left; font-size: 0.8rem; font-weight: 600;
      margin-top: 0.5rem;
    }

    .section-title { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; font-weight: 800; font-size: 1.1rem; }
    
    .summary-lines { display: flex; flex-direction: column; gap: 0.75rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border); }
    .summary-lines .line { display: flex; justify-content: space-between; font-size: 0.95rem; }
    
    .total-line { display: flex; justify-content: space-between; font-size: 1.5rem; font-weight: 900; padding-top: 1.5rem; color: var(--text-main); }

    .final-actions { display: flex; flex-direction: column; gap: 2rem; align-items: center; margin-top: 1rem; }
    .pay-btn { width: 100%; height: 4rem; font-size: 1.25rem; font-weight: 900; border-radius: var(--radius-xl); }

    .security-footer { display: flex; gap: 2.5rem; font-size: 0.75rem; color: var(--text-muted); font-weight: 700; }

    @media (max-width: 600px) {
      .pay-item-preview { grid-template-columns: 1fr; }
    }
  `]
})
export class ComponentePagoFinal implements OnInit {
  sCarrito = inject(ServicioCarrito);
  sPago = inject(ServicioPago);
  sUsuario = inject(ServicioUsuario);
  router = inject(Router);

  ngOnInit() {
    this.sPago.establecerPaso(4);
  }

  alEditarCarrito() {
    this.router.navigate(['/carrito']);
  }

  alEditarDireccion() {
    this.router.navigate(['/pago/direccion']);
  }

  alEditarTarjeta() {
    this.router.navigate(['/pago/tarjeta']);
  }

  alPagar() {
    const articulos = this.sCarrito.articulosActivos();

    if (articulos.length > 0) {
      const nuevoPedido: Pedido = {
        id: `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        fecha: new Date().toISOString().split('T')[0],
        estado: 'entregado', // Se marca como entregado para que aparezca en el historial
        total: this.sCarrito.totalTotal(),
        productos: articulos.map(a => ({
          id: a.id,
          nombre: a.nombre,
          cantidad: a.cantidad,
          precio: a.precio,
          imagen: a.imagen || ''
        }))
      };

      this.sUsuario.registrarPedido(nuevoPedido);
      this.sPago.registrarUltimoPedido(nuevoPedido);
    }

    this.sCarrito.vaciarCarrito();
    this.router.navigate(['/pago/exito']);
  }
}
