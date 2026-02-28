# Guía de Desarrollo - CompuComercio

Bienvenido a la documentación detallada de **CompuComercio**. Este documento describe la arquitectura, las convenciones de nomenclatura y las mejores prácticas del proyecto.

## Arquitectura del Proyecto

El proyecto sigue una estructura basada en dominios y responsabilidades claras:

### 1. Núcleo (`src/app/nucleo/`)
Contiene la lógica central de la aplicación que es compartida globalmente.
- **Servicios (`servicios/`):**
  - `ServicioCarrito`: Gestiona el estado de los artículos, subtotales e impuestos mediante Signals.
  - `ServicioPago`: Controla el flujo del proceso de pago y la información del cliente.
  - `ServicioVistaRapida`: Gestiona la visibilidad del modal de detalle rápido.
- **Configuración (`aplicacion.config.ts`):** Configuración global de Angular, incluyendo rutas y SSR.

### 2. Páginas (`src/app/paginas/`)
Cada directorio representa una ruta principal de la aplicación.
- `inicio/`: Página de inicio con banners, categorías y productos destacados.
- `productos/`: Listado de categorías con filtros laterales.
- `busqueda/`: Resultados de búsqueda con chips interactivos.
- `detalle-producto/`: Información detallada, reseñas y productos relacionados.
- `carrito/`: Gestión de la bolsa de compras.
- `pago/`: Flujo de checkout con disposición propia (`pago-disposicion`).

### 3. Componentes Compartidos (`src/app/compartido/`)
Componentes UI de bajo nivel y utilidades que no pertenecen a una página específica, como el modal de `VistaRapida`.

## Convenciones de Nomenclatura

Para mantener la consistencia en el proyecto:
- **Archivos:** `nombre-archivo.componente.ts`, `nombre-archivo.servicio.ts`, `nombre-archivo.rutas.ts`.
- **Clases:** `ComponenteNombre`, `ServicioNombre`, `PaginaNombre`.
- **Selectores:** `app-nombre-componente`, `app-pagina-nombre`.
- **Métodos:** Utilizar prefijos como `al` (para eventos, ej: `alHacerClick`) u nombres descriptivos en español.

## Estado de la Aplicación (Angular Signals)

Se ha priorizado el uso de **Signals** sobre RxJS para el estado sincronizado de la UI:
- El `ServicioCarrito` utiliza señales computadas (`computed`) para calcular totales en tiempo real sin suscripciones manuales.
- El `ServicioVistaRapida` expone señales de sólo lectura para que los componentes reaccionen al cambio de producto seleccionado.

# Guía de Arquitectura y Escalabilidad - Por José Cadenas

En esta guía detallo cómo he estructurado el código de **CompuComercio** para que sea fácil de mantener y escalar en el futuro. He seguido una filosofía de "componentes puros" y "servicios potentes".

## 🧠 El Cerebro: Servicios Globales (`/nucleo/servicios`)

He centralizado toda la lógica de negocio en servicios inyectables para que las páginas solo se encarguen de pintar.

1.  **ServicioCarrito**: Maneja el estado global de la compra. Uso señales computadas para el subtotal, impuestos y total, garantizando que siempre estén actualizados.
2.  **ServicioPago**: Controla el flujo del checkout. He implementado `registrarUltimoPedido(pedido)` para que la pantalla de confirmación pueda mostrar datos reales aunque el carrito ya esté vacío.
3.  **ServicioUsuario**: Gestiona la sesión y el historial. Aquí es donde los pedidos "pendientes" y el "historial" se separan lógicamente.

## 🛠️ Mis Reglas de Validación

Para garantizar que los datos sean correctos desde que el usuario los escribe, he implementado filtros en tiempo real en los inputs mediante el evento `(input)`:
- `filtrarSoloLetras()`: Limpia cualquier carácter que no sea una letra o espacio. Vital para Nombres y Apellidos.
- `filtrarSoloNumeros()`: Elimina cualquier cosa que no sea un dígito. Se usa en Teléfonos, Códigos Postales y Tarjetas.

## 📐 Estructura de Páginas

He organizado las páginas para que sean módulos independientes:
- **Detalle de Producto**: Detecta el origen del tráfico para mostrar botones de navegación inteligentes.
- **Checkout**: Dividido en mini-componentes dentro de `/pago/ui` para que cada paso sea fácil de depurar.

## 🎨 Estilo Premium y Animaciones

He definido un sistema de variables CSS en `styles.css` para mantener la coherencia (colores, bordes, sombras). Para dar vida a la interfaz, he creado un archivo `compartido/animaciones.ts` con efectos de cascada y deslizamiento que hacen que la navegación se sienta fluida.

## 🚀 Cómo escalar la aplicación

Si necesitas añadir una nueva sección:
1.  Crea el componente en su carpeta dentro de `/paginas`.
2.  Define su ruta en `aplicacion.rutas.ts`.
3.  Si maneja datos globales, añade la lógica al servicio correspondiente en `/nucleo/servicios`.
4.  Mantén el estándar de nombres: `mi-archivo.componente.ts` y usa el prefijo `al` para métodos de eventos (ej: `alPagar()`, `alEliminar()`).

---
"Hecho con foco en la calidad y la experiencia del usuario." - *José Cadenas*
