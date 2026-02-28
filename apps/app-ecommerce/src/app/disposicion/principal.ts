/**
 * @file principal.ts
 * @description Componente raíz del layout de la aplicación.
 *
 * Este es el "shell" que envuelve toda la app. Contiene el header (navbar),
 * el footer, el `<router-outlet>` donde se renderizan las páginas, y el
 * componente de vista rápida que se muestra sobre todo lo demás cuando está activo.
 *
 * También gestiona dos modales globales:
 * - **Modal de soporte**: formulario de contacto/soporte técnico
 * - **Modal de info**: textos legales / información de la empresa (sobre nosotros,
 *   términos, privacidad, carreras), definidos aquí en `infoContenido`
 *
 * Las animaciones de transición entre rutas las maneja `animacionRuta`
 * a través de `prepararRuta()`, que lee el campo `data.animacion` de cada ruta.
 */
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router, RouterLink, ChildrenOutletContexts } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComponenteVistaRapida } from '../compartido/ui/vista-rapida.componente';
import { ServicioCarrito } from '../nucleo/servicios/carrito.servicio';
import { ServicioUsuario } from '../nucleo/servicios/usuario.servicio';
import { animacionRuta } from '../compartido/animaciones';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterOutlet, ComponenteVistaRapida, RouterLink, CommonModule],
  templateUrl: './principal.html',
  styleUrls: ['./principal.css'],
  animations: [animacionRuta]
})
export class ComponentePrincipal {
  sCarrito = inject(ServicioCarrito);
  sUsuario = inject(ServicioUsuario);
  private contextos = inject(ChildrenOutletContexts);
  private router = inject(Router);

  // Modales
  modalSoporteAbierto = signal(false);
  modalInfoAbierto = signal<string | null>(null);

  readonly infoContenido: Record<string, { titulo: string; texto: string }> = {
    'sobre-nosotros': {
      titulo: 'Sobre Nosotros',
      texto: 'CompuComercio es tu tienda especializada en tecnología de vanguardia. Fundada en 2020, ofrecemos los mejores productos de hardware, software y accesorios digitales con envío express garantizado a todo el país. Nuestro compromiso es llevarte la mejor tecnología al mejor precio con la mayor garantía del mercado.'
    },
    carreras: {
      titulo: 'Trabaja con Nosotros',
      texto: 'En CompuComercio siempre estamos buscando talento apasionado por la tecnología. Ofrecemos un ambiente dinámico, salarios competitivos y oportunidades de crecimiento. Envía tu CV a empleos@compucomercio.com y forma parte de nuestro equipo.'
    },
    privacidad: {
      titulo: 'Política de Privacidad',
      texto: 'En CompuComercio respetamos y protegemos tu privacidad. Todos los datos personales que recopilamos son utilizados únicamente para mejorar tu experiencia de compra y nunca son compartidos con terceros sin tu consentimiento. Cumplimos con todas las regulaciones de protección de datos vigentes.'
    },
    terminos: {
      titulo: 'Términos y Condiciones',
      texto: 'Al utilizar CompuComercio aceptas nuestros términos de servicio. Las compras realizadas están sujetas a disponibilidad de inventario. Ofrecemos garantía de 2 años en todos nuestros productos y devoluciones gratuitas dentro de los 30 días siguientes a la compra.'
    }
  };

  /**
   * Retorna el identificador de animación de la ruta activa para que Angular
   * sepa qué animación aplicar al cambiar de vista.
   */
  prepararRuta() {
    return this.contextos.getContext('primary')?.route?.snapshot?.data?.['animacion'];
  }

  /**
   * Navega al perfil si el usuario está logueado,
   * o al login si aún no tiene sesión activa.
   */
  irAMiCuenta() {
    if (this.sUsuario.estaLogueado()) {
      this.router.navigate(['/perfil']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Hace scroll suave hasta el footer después de un pequeño delay.
   * El delay es necesario porque en algunas rutas el footer puede no estar
   * en el DOM todavía cuando se dispara el evento de click.
   */
  scrollAlFooter() {
    setTimeout(() => {
      const footer = document.getElementById('footer');
      footer?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  abrirModalInfo(clave: string) {
    this.modalInfoAbierto.set(clave);
  }

  cerrarModalInfo() {
    this.modalInfoAbierto.set(null);
  }
}
