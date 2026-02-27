import { Component, signal, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chips-busqueda',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chips-container">
      <div class="chip-group">
        <label>Búsquedas populares</label>
        <div class="chip-list">
          <button class="chip" *ngFor="let pop of populares" (click)="alBuscar(pop)">{{ pop }}</button>
        </div>
      </div>
      
      <div class="chip-group" *ngIf="historial().length > 0">
        <label>Búsquedas registradas</label>
        <div class="chip-list">
          <button class="chip recent" *ngFor="let h of historial()" (click)="alBuscar(h)">
            {{ h }}
            <span class="remove" (click)="$event.stopPropagation(); eliminarDelHistorial(h)">×</span>
          </button>
        </div>
      </div>

      <div class="action-chips">
        <div class="dropdown-wrapper">
          <button class="action-chip" (click)="mostrarOrden = !mostrarOrden">
            Ordenar por: {{ orden() }} ▼
          </button>
          <div class="dropdown-menu" *ngIf="mostrarOrden">
            <button (click)="seleccionarOrden('Relevancia')">Relevancia</button>
            <button (click)="seleccionarOrden('Precio: Menor a Mayor')">Precio: Menor a Mayor</button>
            <button (click)="seleccionarOrden('Precio: Mayor a Menor')">Precio: Mayor a Menor</button>
            <button (click)="seleccionarOrden('Más vendidos')">Más vendidos</button>
          </div>
        </div>
        <button class="action-chip" [class.active]="soloOfertas()" (click)="toggleOfertas()">Ofertas</button>
      </div>
    </div>
  `,
  styles: [`
    .chips-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .chip-group label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-main);
      margin-bottom: 0.75rem;
    }
    .chip-list {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }
    .chip {
      padding: 0.5rem 1rem;
      background: white;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      font-size: 0.875rem;
      cursor: pointer;
      transition: var(--transition);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .chip:hover {
      border-color: var(--primary);
      color: var(--primary);
    }
    .chip.recent {
      background: var(--background);
    }
    .remove {
      font-size: 1.25rem;
      line-height: 1;
      opacity: 0.5;
    }
    .remove:hover { opacity: 1; }
    
    .action-chips {
      display: flex;
      gap: 0.75rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border);
      position: relative;
    }
    .action-chip {
      padding: 0.5rem 1rem;
      background: white;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
    }
    .action-chip.active {
      background: var(--primary-light);
      border-color: var(--primary);
      color: var(--primary);
    }
    
    .dropdown-wrapper { position: relative; }
    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 0.5rem;
      background: white;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      z-index: 10;
      width: 200px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .dropdown-menu button {
      padding: 0.75rem 1rem;
      text-align: left;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 0.875rem;
    }
    .dropdown-menu button:hover { background: var(--background); }
  `]
})
export class ChipsBusquedaComponente implements OnInit {
  @Input() set initialOrden(val: string) { if (val) this.orden.set(val); }
  @Input() set initialSoloOfertas(val: boolean) { this.soloOfertas.set(val); }

  @Output() busqueda = new EventEmitter<string>();
  @Output() cambioOrden = new EventEmitter<string>();
  @Output() cambioOfertas = new EventEmitter<boolean>();

  populares = ['Laptops Gaming', 'Monitor 4K', 'Teclado Mecánico', 'PC Armado', 'Ofertas'];
  historial = signal<string[]>([]);
  orden = signal('Relevancia');
  soloOfertas = signal(false);
  mostrarOrden = false;

  ngOnInit() {
    const saved = localStorage.getItem('historial_busqueda');
    if (saved) {
      this.historial.set(JSON.parse(saved));
    } else {
      // Mock initial history
      this.historial.set(['macbook', 'rtx 4090', 'razer']);
    }
  }

  alBuscar(termino: string) {
    if (termino === 'Ofertas') {
      this.toggleOfertas();
      return;
    }

    this.busqueda.emit(termino);

    const actual = this.historial();
    if (!actual.includes(termino)) {
      const nuevo = [termino, ...actual].slice(0, 5);
      this.historial.set(nuevo);
      localStorage.setItem('historial_busqueda', JSON.stringify(nuevo));
    }
  }

  eliminarDelHistorial(termino: string) {
    const nuevo = this.historial().filter(t => t !== termino);
    this.historial.set(nuevo);
    localStorage.setItem('historial_busqueda', JSON.stringify(nuevo));
  }

  seleccionarOrden(val: string) {
    this.orden.set(val);
    this.cambioOrden.emit(val);
    this.mostrarOrden = false;
  }

  toggleOfertas() {
    this.soloOfertas.set(!this.soloOfertas());
    this.cambioOfertas.emit(this.soloOfertas());
  }
}
