/**
 * @file datos-productos.ts
 * @description Catálogo de productos y funciones de consulta.
 *
 * Aquí centralizo los datos de productos que usa toda la aplicación.
 * Actualmente son datos de ejemplo (mock) para poder trabajar sin un backend real.
 * Cuando se integre una API, solo hay que reemplazar `PRODUCTOS_EJEMPLO` por
 * llamadas HTTP y actualizar las dos funciones de utilidad al final del archivo.
 *
 * Cada producto sigue la interfaz `Producto` definida aquí mismo.
 * Los IDs siguen la convención: CATEGORÍA-NUM (ej. LAP-001, MON-002, TEC-001).
 */
/**
 * Catálogo de productos de ejemplo con imágenes y datos reales.
 */
export interface Producto {
  id: string;
  nombre: string;
  codigo: string;
  precio: number;
  precioAnterior?: number;
  categoria: string;
  marca: string;
  imagen: string;
  enOferta: boolean;
  enStock: boolean;
  estrellas: number;
  resenas: number;
  descripcion: string;
  atributos: string[];
}

export const PRODUCTOS_EJEMPLO: Producto[] = [
  {
    id: 'LAP-001',
    nombre: 'Laptop Predator Helios 300',
    codigo: 'PRD-H300',
    precio: 1299,
    precioAnterior: 1599,
    categoria: 'Laptops',
    marca: 'Predator',
    imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=80',
    enOferta: true,
    enStock: true,
    estrellas: 5,
    resenas: 128,
    descripcion: 'Laptop gaming de alto rendimiento con pantalla IPS de 144Hz.',
    atributos: ['Core i7', '16GB RAM', '512GB SSD', 'RTX 3060']
  },
  {
    id: 'LAP-002',
    nombre: 'MacBook Pro M3',
    codigo: 'APL-MBP-M3',
    precio: 1999,
    categoria: 'Laptops',
    marca: 'Apple',
    imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&auto=format&fit=crop&q=85',
    enOferta: false,
    enStock: true,
    estrellas: 5,
    resenas: 89,
    descripcion: 'El MacBook Pro más potente con chip M3.',
    atributos: ['Apple M3', '18GB RAM', '512GB SSD']
  },
  {
    id: 'LAP-003',
    nombre: 'Razer Blade 15',
    codigo: 'RZR-B15',
    precio: 1499,
    precioAnterior: 1799,
    categoria: 'Laptops',
    marca: 'Razer',
    imagen: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&auto=format&fit=crop&q=80',
    enOferta: true,
    enStock: true,
    estrellas: 4,
    resenas: 67,
    descripcion: 'Laptop gaming premium con diseño ultradelgado.',
    atributos: ['Core i9', '32GB RAM', '1TB SSD', 'RTX 4070']
  },
  {
    id: 'MON-001',
    nombre: 'Monitor LG UltraWide 34"',
    codigo: 'LG-UW34',
    precio: 799,
    precioAnterior: 999,
    categoria: 'Monitores',
    marca: 'LG',
    imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200&auto=format&fit=crop&q=85',
    enOferta: true,
    enStock: true,
    estrellas: 5,
    resenas: 214,
    descripcion: 'Monitor ultraancho 4K para máxima productividad.',
    atributos: ['4K', '144Hz', 'HDR', 'USB-C']
  },
  {
    id: 'MON-002',
    nombre: 'Samsung Odyssey G7',
    codigo: 'SAM-G7',
    precio: 599,
    categoria: 'Monitores',
    marca: 'Samsung',
    imagen: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&auto=format&fit=crop&q=80',
    enOferta: false,
    enStock: true,
    estrellas: 4,
    resenas: 155,
    descripcion: 'Monitor gaming curvo con panel VA de 240Hz.',
    atributos: ['QHD', '240Hz', 'Curvo', 'G-Sync']
  },
  {
    id: 'TEC-001',
    nombre: 'Teclado Logitech MX Keys',
    codigo: 'LGT-MXK',
    precio: 119,
    categoria: 'Teclados',
    marca: 'Logitech',
    imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80',
    enOferta: false,
    enStock: true,
    estrellas: 5,
    resenas: 342,
    descripcion: 'Teclado inalámbrico premium con teclas retroiluminadas.',
    atributos: ['Inalámbrico', 'Bluetooth', 'Retroiluminado']
  },
  {
    id: 'TEC-002',
    nombre: 'Razer BlackWidow V4',
    codigo: 'RZR-BW4',
    precio: 189,
    precioAnterior: 229,
    categoria: 'Teclados',
    marca: 'Razer',
    imagen: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&auto=format&fit=crop&q=80',
    enOferta: true,
    enStock: false,
    estrellas: 4,
    resenas: 97,
    descripcion: 'Teclado mecánico gaming con switches Razer Green.',
    atributos: ['Mecánico', 'RGB', 'Anti-ghosting']
  },
  {
    id: 'ACC-001',
    nombre: 'Mouse Logitech MX Master 3',
    codigo: 'LGT-MX3',
    precio: 99,
    categoria: 'Accesorios',
    marca: 'Logitech',
    imagen: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&auto=format&fit=crop&q=80',
    enOferta: false,
    enStock: true,
    estrellas: 5,
    resenas: 523,
    descripcion: 'Mouse ergonómico inalámbrico con scroll ultrarrápido.',
    atributos: ['Inalámbrico', '4000 DPI', 'Bluetooth']
  }
];

/**
 * Devuelve todos los productos que pertenecen a una categoría o marca determinada.
 * Si no se pasa categoría o se pasa 'todos', retorna el catálogo completo.
 * La comparación es case-insensitive para mayor flexibilidad.
 *
 * @param categoria - Nombre de la categoría o marca a filtrar (ej. 'Laptops', 'Razer')
 * @returns Array de productos que coinciden con el filtro
 */
export function obtenerProductosPorCategoria(categoria: string): Producto[] {
  if (!categoria || categoria.toLowerCase() === 'todos') return PRODUCTOS_EJEMPLO;
  return PRODUCTOS_EJEMPLO.filter(p =>
    p.categoria.toLowerCase() === categoria.toLowerCase() ||
    p.marca.toLowerCase() === categoria.toLowerCase()
  );
}

/**
 * Busca un producto específico por su ID o código SKU.
 * Esto me permite navegar a la ruta `/producto/:id` usando cualquiera de los dos.
 *
 * @param id - El ID del producto (ej. 'LAP-001') o su código SKU (ej. 'PRD-H300')
 * @returns El producto encontrado, o `undefined` si no existe
 */
export function obtenerProductoPorId(id: string): Producto | undefined {
  return PRODUCTOS_EJEMPLO.find(p => p.id === id || p.codigo === id);
}
