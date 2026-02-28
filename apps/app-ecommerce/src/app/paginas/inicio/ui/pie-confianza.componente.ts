import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pie-confianza',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="trust-footer">
      <h3>Confianza y medios de pago</h3>
      <div class="icons-container">
        <!-- Mock icons -->
        <div class="icon-box" *ngFor="let i of [1,2,3,4]"></div>
      </div>
    </section>
  `,
  styles: [`
    .trust-footer {
      padding: 30px 20px;
      text-align: center;
      border-top: 1px solid #eee;
    }
    .icons-container {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 15px;
    }
    .icon-box {
      width: 50px;
      height: 30px;
      background-color: #e0e0e0;
      border-radius: 4px;
    }
  `]
})
export class PieConfianzaComponente { }
