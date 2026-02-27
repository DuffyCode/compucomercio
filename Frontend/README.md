# CompuComercio 🚀

Este proyecto es una plataforma de comercio electrónico moderna. Utiliza Angular v20, Signals para la gestión de estado y renderizado en el lado del servidor (SSR).

## Características Principales

- **Gestión de Carrito:** Implementada con Angular Signals para una reactividad eficiente.
- **Proceso de Pago (Checkout):** Un flujo de varios pasos (resumen, confirmación, pago y éxito).
- **Vista Rápida:** Modal de detalle de producto integrado en listas y parrillas.
- **Búsqueda Dinámica:** Sistema de búsqueda con sugerencias y filtros laterales.
- **Arquitectura en Español:** Todos los servicios, componentes y rutas utilizan nomenclatura en español (`nucleo/servicios`, `paginas`, `disposicion`).

## Inicio Rápido

Para iniciar el servidor de desarrollo local, ejecute:

```bash
npm run start
```

O utilizando el CLI de Angular directamente:

```bash
ng serve
```

Navegue a `http://localhost:4200/`. La aplicación se recargará automáticamente al modificar los archivos fuente.

## Comandos Útiles

### Generación de Código
Para generar un nuevo componente, servicio o módulo:
```bash
ng generate component nombre-del-componente
```

### Construcción (Build)
Para compilar el proyecto y generar los artefactos en el directorio `dist/`:
```bash
npm run build
```
# CompuComercio 🚀 - Mi Plataforma de E-commerce Premium

¡Hola! Soy José Cadenas y este es mi proyecto de e-commerce moderno. He diseñado esta aplicación para que sea rápida, segura y visualmente impactante, utilizando las últimas tecnologías de Angular.

## ¿Qué hace especial a CompuComercio?

He puesto mucho foco en los detalles que marcan la diferencia en una experiencia de compra:

- **Seguridad al Corazón:** Todos los formularios de registro, perfil y pago tienen validaciones inteligentes en tiempo real. Si es un nombre, solo acepta letras; si es un teléfono o tarjeta, solo números. ¡Nada de basura en la base de datos!
- **Checkout Inteligente:** He creado un flujo de pago de 4 pasos (Dirección -> Envío -> Pago -> Confirmación) que guía al usuario de forma segura. Además, la pantalla de éxito guarda una "memoria" del pedido recién hecho para que el usuario vea sus productos e imágenes incluso después de vaciar el carrito.
- **Navegación Fluida:** El detalle de producto sabe de dónde vienes. Si vienes de la búsqueda o historial, te ofrece un botón de regreso elegante; si vienes del inicio, se mantiene limpio.
- **Estado Moderno:** Uso **Angular Signals** en todos los servicios (Carrito, Pago, Usuario) para que la web sea reactiva y vuele.

## Tecnologías que he usado

- **Angular v20**: Con Signals y Server Side Rendering (SSR).
- **TypeScript**: Para un código robusto y fácil de escalar.
- **CSS3 Puro**: Sin frameworks pesados, todo el estilo premium es artesanal.
- **Unsplash API**: Para imágenes de productos de alta calidad.

## Para empezar a trabajar

1. Instala las dependencias: `npm install`
2. Lanza el proyecto: `npm run start`

La web se abrirá en `http://localhost:4200/`. ¡He configurado todo para que se recargue solo cada vez que guardes un cambio!

## Estructura que he definido

- `src/app/nucleo/`: Aquí está el cerebro. Servicios globales y datos maestros.
- `src/app/paginas/`: Los componentes de vista principales (donde ocurre la magia de cada sección).
- `src/app/compartido/`: Mis piezas reutilizables (modales, animaciones, etc.).
- `src/app/disposicion/`: El esqueleto de la aplicación (Header, Footer, Layouts).

---

Si quieres profundizar en cómo he montado la arquitectura, echa un ojo a mi [Guía de Desarrollo](./Guia.md).
