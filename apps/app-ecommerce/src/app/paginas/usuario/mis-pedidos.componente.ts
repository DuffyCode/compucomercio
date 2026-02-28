import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicioUsuario, Pedido } from '../../nucleo/servicios/usuario.servicio';
import { ServicioCarrito } from '../../nucleo/servicios/carrito.servicio';
import { deslizarY } from '../../compartido/animaciones';

/**
 * @file mis-pedidos.componente.ts
 * @description Página para consultar el estado y el historial de compras.
 *
 * Tiene dos pestañas ("tabs"):
 * - **Pedidos pendientes**: muestra órdenes en camino o por enviar (`pendiente` / `enviado`)
 * - **Historial**: muestra compras finalizadas o anuladas (`entregado` / `cancelado`)
 *
 * Utiliza los métodos filtrados de pedidos directamente de `ServicioUsuario`.
 */
@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  animations: [deslizarY],
  template: `
    <div class="pedidos-wrapper" @deslizarY>
      <div class="pedidos-header">
        <a routerLink="/perfil" class="back-profile-pill">
           <span class="icon">👤</span> Mi perfil
        </a>
        <h1>Pedidos</h1>
      </div>

      <div class="tabs">
        <button [class.active]="tabActivo() === 'pendientes'" (click)="tabActivo.set('pendientes')" class="tab">
          Pedidos pendientes
          <span class="tab-count" *ngIf="pendientes().length">{{ pendientes().length }}</span>
        </button>
        <button [class.active]="tabActivo() === 'historial'" (click)="tabActivo.set('historial')" class="tab">
          Historial de pedidos
        </button>
      </div>

      <div class="pedidos-list">
        <!-- Pendientes -->
        <ng-container *ngIf="tabActivo() === 'pendientes'">
          <div class="pedido-card" *ngFor="let p of pendientes()" @deslizarY>
            <div class="pedido-head">
              <div>
                <span class="pedido-id">{{ p.id }}</span>
                <span class="pedido-fecha">{{ p.fecha | date:'mediumDate' }}</span>
              </div>
              <span class="estado-badge" [class]="p.estado">{{ estadoLabel(p.estado) }}</span>
            </div>
            <div class="pedido-productos">
              <div class="pedido-producto" *ngFor="let prod of p.productos">
                <img [src]="prod.imagen" [alt]="prod.nombre" class="prod-img" />
                <div class="prod-info">
                  <span class="prod-nombre">{{ prod.nombre }}</span>
                  <span class="prod-qty">Cantidad: {{ prod.cantidad }}</span>
                </div>
                <div class="prod-actions">
                  <span class="prod-precio">{{ prod.precio | currency }}</span>
                  <a [routerLink]="['/producto', prod.id]" 
                     [queryParams]="p.id !== 'CARRITO-ACTUAL' ? { readonly: 'true' } : null"
                     class="btn-details">Ver detalles</a>
                </div>
              </div>
            </div>
            <div class="pedido-footer">
              <span class="pedido-total">Total: <strong>{{ p.total | currency }}</strong></span>
            </div>
          </div>
          <div class="empty-state" *ngIf="pendientes().length === 0">
            <span>📦</span><p>No tienes pedidos pendientes</p>
          </div>
        </ng-container>

        <!-- Historial -->
        <ng-container *ngIf="tabActivo() === 'historial'">
          <div class="pedido-card" *ngFor="let p of historial()" @deslizarY>
            <div class="pedido-head">
              <div>
                <span class="pedido-id">{{ p.id }}</span>
                <span class="pedido-fecha">{{ p.fecha | date:'mediumDate' }}</span>
              </div>
              <span class="estado-badge" [class]="p.estado">{{ estadoLabel(p.estado) }}</span>
            </div>
            <div class="pedido-productos">
              <div class="pedido-producto" *ngFor="let prod of p.productos">
                <img [src]="prod.imagen" [alt]="prod.nombre" class="prod-img" />
                <div class="prod-info">
                  <span class="prod-nombre">{{ prod.nombre }}</span>
                  <span class="prod-qty">Cantidad: {{ prod.cantidad }}</span>
                </div>
                <div class="prod-actions">
                  <span class="prod-precio">{{ prod.precio | currency }}</span>
                  <a [routerLink]="['/producto', prod.id]" 
                     [queryParams]="{ readonly: 'true' }"
                     class="btn-details">Ver detalles</a>
                </div>
              </div>
            </div>
            <div class="pedido-footer">
              <span class="pedido-total">Total: <strong>{{ p.total | currency }}</strong></span>
              <a routerLink="/pago/exito" class="btn-receipt">Ver recibo de pago</a>
            </div>
          </div>
          <div class="empty-state" *ngIf="historial().length === 0">
            <span>🧾</span><p>No tienes pedidos en el historial</p>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    .pedidos-wrapper { max-width: 800px; margin: 0 auto; padding: 2rem 1rem 4rem; }
    .pedidos-header { margin-bottom: 2.5rem; }
    .back-profile-pill {
      display: inline-flex; align-items: center; gap: 0.75rem;
      padding: 0.6rem 1.25rem; background: white; border: 1px solid var(--border);
      border-radius: 999px; font-weight: 700; color: var(--text-main);
      text-decoration: none; font-size: 0.85rem; margin-bottom: 1.5rem;
      transition: var(--transition); box-shadow: var(--shadow-sm);
    }
    .back-profile-pill:hover {
      background: var(--primary); color: white; border-color: var(--primary);
      transform: translateY(-2px); box-shadow: var(--shadow-md);
    }
    .back-profile-pill .icon { font-size: 1rem; }

    h1 { font-size: 2.5rem; font-weight: 900; letter-spacing: -0.02em; }
    .tabs { display: flex; border-bottom: 1px solid var(--border); margin-bottom: 2rem; gap: 0; }
    .tab {
      padding: 1rem 1.75rem; background: none; border: none; cursor: pointer;
      font-size: 0.9rem; font-weight: 600; color: var(--text-muted);
      border-bottom: 2px solid transparent; margin-bottom: -1px; display: flex; align-items: center; gap: 0.5rem;
      transition: var(--transition);
    }
    .tab.active { color: var(--primary); border-bottom-color: var(--primary); }
    .tab-count { background: var(--primary); color: white; border-radius: 999px; padding: 0.1rem 0.5rem; font-size: 0.75rem; }
    .pedidos-list { display: flex; flex-direction: column; gap: 1.25rem; }
    .pedido-card { background: white; border: 1px solid var(--border); border-radius: var(--radius-xl); overflow: hidden; }
    .pedido-head { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); }
    .pedido-id { font-weight: 700; color: var(--text-main); display: block; }
    .pedido-fecha { font-size: 0.8rem; color: var(--text-muted); }
    .estado-badge { padding: 0.35rem 0.875rem; border-radius: 999px; font-size: 0.8rem; font-weight: 600; }
    .estado-badge.pendiente { background: #fef3c7; color: #b45309; }
    .estado-badge.enviado { background: #dbeafe; color: #1d4ed8; }
    .estado-badge.entregado { background: #dcfce7; color: #15803d; }
    .estado-badge.cancelado { background: #fee2e2; color: #dc2626; }
    .pedido-productos { padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
    .pedido-producto { display: flex; align-items: center; gap: 1rem; }
    .prod-img { width: 60px; height: 60px; object-fit: cover; border-radius: var(--radius-lg); flex-shrink: 0; background: var(--background); }
    .prod-info { flex: 1; display: flex; flex-direction: column; gap: 0.2rem; }
    .prod-nombre { font-weight: 600; font-size: 0.95rem; }
    .prod-qty { font-size: 0.8rem; color: var(--text-muted); }
    .prod-precio { font-weight: 700; font-size: 1rem; }
    .prod-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem; }
    .pedido-footer { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem; background: #f8fafc; border-top: 1px solid var(--border); }
    .pedido-total { font-size: 0.95rem; color: var(--text-muted); }
    .btn-details {
      padding: 0.5rem 1.25rem; background: white; border: 1.5px solid var(--primary);
      color: var(--primary); border-radius: 999px; font-size: 0.75rem; font-weight: 700;
      text-decoration: none; transition: var(--transition);
    }
    .btn-details:hover { background: var(--primary); color: white; transform: translateY(-2px); box-shadow: var(--shadow-md); }
    
    .btn-receipt {
      padding: 0.6rem 1.25rem; background: var(--primary); color: white; border: none;
      border-radius: 999px; font-size: 0.85rem; font-weight: 700;
      text-decoration: none; transition: var(--transition); box-shadow: var(--shadow-sm);
    }
    .btn-receipt:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); background: var(--primary-dark); }

    .empty-state { text-align: center; padding: 4rem 2rem; color: var(--text-muted); }
    .empty-state span { font-size: 3rem; display: block; margin-bottom: 1rem; }
  `]
})
export class MisPedidosComponente {
  private sUsuario = inject(ServicioUsuario);
  private sCarrito = inject(ServicioCarrito);

  tabActivo = signal<'pendientes' | 'historial'>('pendientes');

  pendientes() {
    const delServicio = this.sUsuario.pedidosPendientes();
    const delCarrito: Pedido[] = this.sCarrito.articulosActivos().length > 0 ? [{
      id: 'CARRITO-ACTUAL',
      fecha: new Date().toISOString().split('T')[0],
      estado: 'pendiente' as any,
      total: this.sCarrito.totalTotal(),
      productos: this.sCarrito.articulosActivos().map(a => ({
        nombre: a.nombre,
        cantidad: a.cantidad,
        precio: a.precio,
        imagen: a.imagen || '',
        id: a.id // Necesario para el link de detalle
      })) as any
    }] : [];

    return [...delCarrito, ...delServicio];
  }
  historial() { return this.sUsuario.historialPedidos(); }

  estadoLabel(estado: string) {
    const labels: Record<string, string> = {
      pendiente: 'Pendiente', enviado: 'Enviado', entregado: 'Entregado', cancelado: 'Cancelado'
    };
    return labels[estado] ?? estado;
  }
}
