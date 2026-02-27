import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-galeria-productos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gallery-container">
      <div class="main-image">
        <img [src]="imagenActiva()" alt="Imagen del producto" class="main-img" />
      </div>
      <div class="thumbnails">
        <div class="thumb" *ngFor="let img of imagenes; let i = index"
          [class.active]="i === indiceActivo()"
          (click)="indiceActivo.set(i)">
          <img [src]="img" alt="Vista {{ i+1 }}" class="thumb-img" />
        </div>
      </div>
    </div>
  `,
  styles: [`
    .gallery-container { display: flex; flex-direction: column; gap: 1.5rem; position: sticky; top: 6rem; }
    .main-image {
      width: 100%; aspect-ratio: 1;
      background: #f8fafc; border-radius: var(--radius-2xl);
      border: 1px solid var(--border); overflow: hidden;
      display: flex; align-items: center; justify-content: center;
    }
    .main-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1); }
    .main-image:hover .main-img { transform: scale(1.05); }
    
    .thumbnails { display: flex; gap: 1rem; justify-content: center; }
    .thumb {
      width: 90px; height: 90px;
      background: white; border: 2px solid var(--border);
      border-radius: var(--radius-xl); cursor: pointer;
      transition: all 0.3s ease; overflow: hidden;
    }
    .thumb-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; transition: 0.3s; }
    .thumb:hover .thumb-img { opacity: 1; }
    .thumb.active { border-color: black; transform: translateY(-4px); box-shadow: var(--shadow-lg); }
    .thumb.active .thumb-img { opacity: 1; }
  `]
})
export class GaleriaProductosComponente implements OnChanges {
  @Input() imagenes: string[] = [];
  indiceActivo = signal(0);
  imagenActiva = () => this.imagenes[this.indiceActivo()] || '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imagenes']) {
      this.indiceActivo.set(0);
    }
  }
}
