-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         5.7.24 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para compucomercio
CREATE DATABASE IF NOT EXISTS `compucomercio` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `compucomercio`;

-- Volcando estructura para tabla compucomercio.banks
CREATE TABLE IF NOT EXISTS `banks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='bancos registrados';

-- Volcando datos para la tabla compucomercio.banks: ~0 rows (aproximadamente)
DELETE FROM `banks`;

-- Volcando estructura para tabla compucomercio.brands
CREATE TABLE IF NOT EXISTS `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `status` (`status`),
  CONSTRAINT `FK_brands_entity_statuses` FOREIGN KEY (`status`) REFERENCES `entity_statuses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='marcas';

-- Volcando datos para la tabla compucomercio.brands: ~0 rows (aproximadamente)
DELETE FROM `brands`;

-- Volcando estructura para tabla compucomercio.carts
CREATE TABLE IF NOT EXISTS `carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `status` (`status`),
  CONSTRAINT `FK_carts_carts_status` FOREIGN KEY (`status`) REFERENCES `carts_status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_carts_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='registro de carritos guardados por el usuario';

-- Volcando datos para la tabla compucomercio.carts: ~0 rows (aproximadamente)
DELETE FROM `carts`;

-- Volcando estructura para tabla compucomercio.carts_items
CREATE TABLE IF NOT EXISTS `carts_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` decimal(20,6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_id` (`cart_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `FK_carts_items_carts` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_carts_items_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla compucomercio.carts_items: ~0 rows (aproximadamente)
DELETE FROM `carts_items`;

-- Volcando estructura para tabla compucomercio.carts_status
CREATE TABLE IF NOT EXISTS `carts_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla compucomercio.carts_status: ~0 rows (aproximadamente)
DELETE FROM `carts_status`;

-- Volcando estructura para tabla compucomercio.cash
CREATE TABLE IF NOT EXISTS `cash` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `balance` decimal(20,6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='cajas en caso de compra en fisico la compras digitales pueden prevenir de caja principal';

-- Volcando datos para la tabla compucomercio.cash: ~0 rows (aproximadamente)
DELETE FROM `cash`;

-- Volcando estructura para tabla compucomercio.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `status` (`status`),
  CONSTRAINT `FK_categories_entity_statuses` FOREIGN KEY (`status`) REFERENCES `entity_statuses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='categoria principales';

-- Volcando datos para la tabla compucomercio.categories: ~0 rows (aproximadamente)
DELETE FROM `categories`;

-- Volcando estructura para tabla compucomercio.client
CREATE TABLE IF NOT EXISTS `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `tax` varchar(50) NOT NULL DEFAULT '' COMMENT 'RIF/CI',
  `full_name` varchar(255) NOT NULL DEFAULT '',
  `adress` varchar(510) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tax` (`tax`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FK_client_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='datos fiscales del cliente';

-- Volcando datos para la tabla compucomercio.client: ~0 rows (aproximadamente)
DELETE FROM `client`;

-- Volcando estructura para tabla compucomercio.currencies
CREATE TABLE IF NOT EXISTS `currencies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `symbol` varchar(50) NOT NULL,
  `exchange_rate` decimal(20,6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='monedas aceptadas y la tasa de cambio de cada moneda';

-- Volcando datos para la tabla compucomercio.currencies: ~0 rows (aproximadamente)
DELETE FROM `currencies`;

-- Volcando estructura para tabla compucomercio.entity_statuses
CREATE TABLE IF NOT EXISTS `entity_statuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla compucomercio.entity_statuses: ~0 rows (aproximadamente)
DELETE FROM `entity_statuses`;

-- Volcando estructura para tabla compucomercio.inventory_movements
CREATE TABLE IF NOT EXISTS `inventory_movements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `warehouses_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL COMMENT 'tipo de movimiento',
  `origin` varchar(50) NOT NULL COMMENT 'tipo de origen',
  `quantity` decimal(20,6) NOT NULL,
  `unit_cost` decimal(20,6) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `warehouses_id` (`warehouses_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `FK_inventory_movements_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_inventory_movements_warehouses` FOREIGN KEY (`warehouses_id`) REFERENCES `warehouses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla compucomercio.inventory_movements: ~0 rows (aproximadamente)
DELETE FROM `inventory_movements`;

-- Volcando estructura para tabla compucomercio.invoices
CREATE TABLE IF NOT EXISTS `invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `correlative` varchar(255) NOT NULL,
  `fiscal_num` varchar(255) NOT NULL,
  `serial` varchar(255) NOT NULL,
  `issued_at` datetime NOT NULL,
  `total_amount` decimal(20,6) NOT NULL COMMENT 'total pagado',
  `total_amount_coverted` decimal(20,6) NOT NULL,
  `description` varchar(255) NOT NULL,
  `canceled` tinyint(4) NOT NULL,
  `returned` tinyint(4) NOT NULL,
  `status` int(10) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `client_id` (`client_id`),
  KEY `status` (`status`),
  CONSTRAINT `FK_invoices_client` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_invoices_invoice_statuses` FOREIGN KEY (`status`) REFERENCES `invoice_statuses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_invoices_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='facturas generadas';

-- Volcando datos para la tabla compucomercio.invoices: ~0 rows (aproximadamente)
DELETE FROM `invoices`;

-- Volcando estructura para tabla compucomercio.invoice_statuses
CREATE TABLE IF NOT EXISTS `invoice_statuses` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla compucomercio.invoice_statuses: ~0 rows (aproximadamente)
DELETE FROM `invoice_statuses`;

-- Volcando estructura para tabla compucomercio.module
CREATE TABLE IF NOT EXISTS `module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `url` varchar(510) NOT NULL DEFAULT '' COMMENT 'url del modulo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='modulos del ERP con su url y nombre';

-- Volcando datos para la tabla compucomercio.module: ~0 rows (aproximadamente)
DELETE FROM `module`;

-- Volcando estructura para tabla compucomercio.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `shipping_method_id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL COMMENT 'codigo de la orden',
  `subtotal` decimal(20,6) NOT NULL,
  `discount_amount` decimal(20,6) NOT NULL,
  `discount_percentage` decimal(20,6) NOT NULL,
  `tax` decimal(20,6) NOT NULL COMMENT 'iva aplicado',
  `shipping_cost` decimal(20,6) NOT NULL,
  `total_igtf` decimal(20,6) NOT NULL,
  `total` decimal(20,6) NOT NULL,
  `exchange_rate` decimal(20,6) NOT NULL COMMENT 'tasa del dia',
  `description` varchar(255) DEFAULT NULL,
  `date_at` datetime NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `shipping_method_id` (`shipping_method_id`),
  KEY `status` (`status`),
  CONSTRAINT `FK_orders_order_statuses` FOREIGN KEY (`status`) REFERENCES `order_statuses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_orders_shipping_methods` FOREIGN KEY (`shipping_method_id`) REFERENCES `shipping_methods` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_orders_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla compucomercio.orders: ~0 rows (aproximadamente)
DELETE FROM `orders`;

-- Volcando estructura para tabla compucomercio.orders_items
CREATE TABLE IF NOT EXISTS `orders_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` decimal(20,6) NOT NULL,
  `price` decimal(20,6) NOT NULL,
  `partial_discount_amount` decimal(20,6) NOT NULL,
  `partial_discount_percentage` decimal(20,6) NOT NULL,
  `total` decimal(20,6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `FK_orders_items_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_orders_items_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='detalles de la orden';

-- Volcando datos para la tabla compucomercio.orders_items: ~0 rows (aproximadamente)
DELETE FROM `orders_items`;

-- Volcando estructura para tabla compucomercio.order_statuses
CREATE TABLE IF NOT EXISTS `order_statuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla compucomercio.order_statuses: ~0 rows (aproximadamente)
DELETE FROM `order_statuses`;

-- Volcando estructura para tabla compucomercio.payment_methods
CREATE TABLE IF NOT EXISTS `payment_methods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `use_bank` tinyint(4) DEFAULT NULL,
  `use_reference` tinyint(4) DEFAULT NULL,
  `is_digital` tinyint(4) DEFAULT NULL,
  `is_nacional` tinyint(4) DEFAULT NULL,
  `applies_igtf` tinyint(4) DEFAULT NULL COMMENT 'usa igtf',
  `use_retention` enum('ISLR','IAE','RETIVA') DEFAULT NULL,
  `imagen` text,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `status` (`status`),
  CONSTRAINT `FK_payment_methods_entity_statuses` FOREIGN KEY (`status`) REFERENCES `entity_statuses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='medios de pagos disponbiles';

-- Volcando datos para la tabla compucomercio.payment_methods: ~0 rows (aproximadamente)
DELETE FROM `payment_methods`;

-- Volcando estructura para tabla compucomercio.payment_movements
CREATE TABLE IF NOT EXISTS `payment_movements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `amount` decimal(20,6) DEFAULT NULL COMMENT 'cantidad de la moneda registrada',
  `igtf_amount` decimal(20,6) DEFAULT NULL,
  `igtf_converted` decimal(20,6) DEFAULT NULL,
  `currency_code` int(11) DEFAULT NULL COMMENT 'codigo de la moneda',
  `amount_converted` decimal(20,6) DEFAULT NULL COMMENT 'moneda al cambio',
  `reference` varchar(255) DEFAULT NULL,
  `bank_origin_id` int(11) DEFAULT NULL,
  `bank_destiny_id` int(11) DEFAULT NULL,
  `cash` int(11) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL COMMENT 'tipo de movimiento',
  `origin` varchar(50) DEFAULT NULL COMMENT 'tipo de origen',
  `description` varchar(255) DEFAULT NULL,
  `date_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bank_destiny_id` (`bank_destiny_id`),
  KEY `bank_origin_id` (`bank_origin_id`) USING BTREE,
  KEY `payment_id` (`payment_id`),
  KEY `cash` (`cash`),
  KEY `order_id` (`order_id`),
  KEY `currency_code` (`currency_code`),
  CONSTRAINT `FK_payment_movements_banks` FOREIGN KEY (`bank_origin_id`) REFERENCES `banks` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_payment_movements_banks_2` FOREIGN KEY (`bank_destiny_id`) REFERENCES `banks` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_payment_movements_cash` FOREIGN KEY (`cash`) REFERENCES `cash` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_payment_movements_currencies` FOREIGN KEY (`currency_code`) REFERENCES `currencies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_payment_movements_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_payment_movements_payment_methods` FOREIGN KEY (`payment_id`) REFERENCES `payment_methods` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='movimientos de pagos';

-- Volcando datos para la tabla compucomercio.payment_movements: ~0 rows (aproximadamente)
DELETE FROM `payment_movements`;

-- Volcando estructura para tabla compucomercio.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `module_id` int(11) DEFAULT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `action` varchar(50) NOT NULL DEFAULT '' COMMENT 'acción a realizar',
  PRIMARY KEY (`id`),
  KEY `module_id` (`module_id`) USING BTREE,
  CONSTRAINT `FK_permissions_module` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='permisos';

-- Volcando datos para la tabla compucomercio.permissions: ~0 rows (aproximadamente)
DELETE FROM `permissions`;

-- Volcando estructura para tabla compucomercio.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `cost` decimal(20,6) DEFAULT NULL,
  `price` decimal(20,6) DEFAULT NULL,
  `tax_id` int(11) DEFAULT NULL COMMENT 'iva aplicado',
  `active_web` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `tax_id` (`tax_id`),
  KEY `brand_id` (`brand_id`),
  CONSTRAINT `FK_products_brands` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_products_tax` FOREIGN KEY (`tax_id`) REFERENCES `tax` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla compucomercio.products: ~0 rows (aproximadamente)
DELETE FROM `products`;

-- Volcando estructura para tabla compucomercio.product_images
CREATE TABLE IF NOT EXISTS `product_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `url` text,
  `display_order` int(11) DEFAULT NULL COMMENT 'en caso de tener un carrusel',
  `is_default` tinyint(4) DEFAULT NULL COMMENT 'será la primera que se muestre en la pagina',
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `FK__products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla compucomercio.product_images: ~0 rows (aproximadamente)
DELETE FROM `product_images`;

-- Volcando estructura para tabla compucomercio.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`(100)) USING BTREE,
  KEY `status` (`status`),
  CONSTRAINT `FK_roles_entity_statuses` FOREIGN KEY (`status`) REFERENCES `entity_statuses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='roles';

-- Volcando datos para la tabla compucomercio.roles: ~0 rows (aproximadamente)
DELETE FROM `roles`;

-- Volcando estructura para tabla compucomercio.roles_permissions
CREATE TABLE IF NOT EXISTS `roles_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `permission_id` (`permission_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `FK_roles_permissions_permissions` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_roles_permissions_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='los permisos que tiene cada rol';

-- Volcando datos para la tabla compucomercio.roles_permissions: ~0 rows (aproximadamente)
DELETE FROM `roles_permissions`;

-- Volcando estructura para tabla compucomercio.shipping_methods
CREATE TABLE IF NOT EXISTS `shipping_methods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `base_cost` decimal(20,6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='formas de envio';

-- Volcando datos para la tabla compucomercio.shipping_methods: ~0 rows (aproximadamente)
DELETE FROM `shipping_methods`;

-- Volcando estructura para tabla compucomercio.sub_categories
CREATE TABLE IF NOT EXISTS `sub_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`) USING BTREE,
  KEY `status` (`status`),
  CONSTRAINT `FK_sub_categories_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_sub_categories_entity_statuses` FOREIGN KEY (`status`) REFERENCES `entity_statuses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='sub categorias';

-- Volcando datos para la tabla compucomercio.sub_categories: ~0 rows (aproximadamente)
DELETE FROM `sub_categories`;

-- Volcando estructura para tabla compucomercio.tax
CREATE TABLE IF NOT EXISTS `tax` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT 'nombre de la alicuota',
  `value` decimal(20,6) NOT NULL COMMENT 'valor de la alicuota',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='tabla de alicoutas';

-- Volcando datos para la tabla compucomercio.tax: ~0 rows (aproximadamente)
DELETE FROM `tax`;

-- Volcando estructura para tabla compucomercio.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL DEFAULT '',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`(100)),
  KEY `status` (`status`),
  CONSTRAINT `FK_users_entity_statuses` FOREIGN KEY (`status`) REFERENCES `entity_statuses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='usuarios';

-- Volcando datos para la tabla compucomercio.users: ~0 rows (aproximadamente)
DELETE FROM `users`;

-- Volcando estructura para tabla compucomercio.users_roles
CREATE TABLE IF NOT EXISTS `users_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`) USING BTREE,
  KEY `role_id` (`role_id`) USING BTREE,
  CONSTRAINT `FK_users_roles_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_users_roles_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='los roles de cada usuario';

-- Volcando datos para la tabla compucomercio.users_roles: ~0 rows (aproximadamente)
DELETE FROM `users_roles`;

-- Volcando estructura para tabla compucomercio.warehouses
CREATE TABLE IF NOT EXISTS `warehouses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `adress` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `status` (`status`),
  CONSTRAINT `FK_warehouses_entity_statuses` FOREIGN KEY (`status`) REFERENCES `entity_statuses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='depositos fisicos';

-- Volcando datos para la tabla compucomercio.warehouses: ~0 rows (aproximadamente)
DELETE FROM `warehouses`;

-- Volcando estructura para tabla compucomercio.warehouses_stock
CREATE TABLE IF NOT EXISTS `warehouses_stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `warehouses_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` decimal(20,6) NOT NULL,
  `create_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNICA` (`warehouses_id`,`product_id`),
  KEY `warehouses_id` (`warehouses_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `FK_warehouses_stock_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_warehouses_stock_warehouses` FOREIGN KEY (`warehouses_id`) REFERENCES `warehouses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COMMENT='existencia en depositos';

-- Volcando datos para la tabla compucomercio.warehouses_stock: ~0 rows (aproximadamente)
DELETE FROM `warehouses_stock`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
