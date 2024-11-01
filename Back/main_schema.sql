-- CREAR TABLAS
CREATE TABLE `categorias_producto` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `fabricas` (
  `id_fabrica` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_fabrica`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `formas_pago` (
  `id_forma_pago` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_forma_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(100) NOT NULL,
  `stock_actual` int NOT NULL,
  `precio_lista` decimal(10,2) DEFAULT NULL,
  `descuento_uno` decimal(10,2) DEFAULT NULL,
  `costo_intermedio` decimal(10,2) DEFAULT NULL,
  `descuento_dos` decimal(10,2) DEFAULT NULL,
  `costo_final` decimal(10,2) DEFAULT NULL,
  `incremento` decimal(10,2) DEFAULT NULL,
  `precio_sugerido` decimal(10,2) DEFAULT NULL,
  `precio_final` decimal(10,2) DEFAULT NULL,
  `ganancia` decimal(10,2) DEFAULT NULL,
  `id_categoria` int NOT NULL,
  `id_fabrica` int NOT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_categoria` (`id_categoria`),
  KEY `id_fabrica` (`id_fabrica`),
  CONSTRAINT `id_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categorias_producto` (`id_categoria`),
  CONSTRAINT `id_fabrica` FOREIGN KEY (`id_fabrica`) REFERENCES `fabricas` (`id_fabrica`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `repartidores` (
  `id_repartidor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_repartidor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `roles` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `id_rol` int NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `id_rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ventas` (
  `id_venta` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `precio_delivery` decimal(10,2) NOT NULL,
  `id_repartidor` int NOT NULL,
  `total_venta` decimal(10,2) DEFAULT NULL,
  `id_forma_pago` int NOT NULL,
  `entregado` tinyint DEFAULT NULL,
  `facturado` tinyint DEFAULT NULL,
  PRIMARY KEY (`id_venta`),
  KEY `id_repartidor` (`id_repartidor`),
  KEY `id_forma_pago` (`id_forma_pago`),
  CONSTRAINT `id_forma_pago` FOREIGN KEY (`id_forma_pago`) REFERENCES `formas_pago` (`id_forma_pago`),
  CONSTRAINT `id_repartidor` FOREIGN KEY (`id_repartidor`) REFERENCES `repartidores` (`id_repartidor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ventas_producto` (
  `id_venta_producto` int NOT NULL AUTO_INCREMENT,
  `id_venta` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL,
  `subtotal_venta` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_venta_producto`),
  KEY `id_venta` (`id_venta`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `id_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  CONSTRAINT `id_venta` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- CARGAR DATOS DE PRUEBA
INSERT INTO categorias_producto (descripcion) VALUES
('Alimento'),
('Ropa'),
('Juguetes');

INSERT INTO fabricas (nombre) VALUES
('Fabrica Uno'),
('Fabrica Dos'),
('Fabrica Tres');

INSERT INTO formas_pago (descripcion) VALUES
('Efectivo'),
('Tarjeta de Crédito'),
('Transferencia Bancaria');

INSERT INTO productos (nombre_producto, stock_actual, precio_lista, descuento_uno, costo_intermedio, descuento_dos, costo_final, incremento, precio_sugerido, precio_final, ganancia, id_categoria, id_fabrica) VALUES
('Alimento Gato 1Kg', 100, 1500.00, 10.00, 1350.00, 5.00, 1282.50, 15.00, 1450.00, 1600.00, 200.00, 1, 1),
('Chaleco Perro', 200, 50.00, 5.00, 47.50, 2.00, 46.55, 10.00, 48.00, 52.00, 5.45, 2, 2),
('Muñeco Perro', 150, 30.00, 5.00, 28.50, 3.00, 27.65, 8.00, 32.00, 33.00, 4.50, 3, 3);

INSERT INTO repartidores (nombre) VALUES
('Juan Pérez'),
('María López'),
('Carlos Gómez');

INSERT INTO roles (nombre) VALUES
('Administrador'),
('Editor'),
('Lector');

INSERT INTO usuarios (email, password, id_rol) VALUES
('admin@example.com', 'password123', 1),
('vendedor@example.com', 'password456', 2),
('cliente@example.com', 'password789', 3);

INSERT INTO ventas (fecha, precio_delivery, id_repartidor, total_venta, id_forma_pago, entregado, facturado) VALUES
('2024-10-01', 50.00, 1, 1650.00, 2, 1, 1),
('2024-10-02', 20.00, 2, 60.00, 1, 0, 1),
('2024-10-03', 30.00, 3, 300.00, 3, 1, 0);

INSERT INTO ventas_producto (id_venta, id_producto, cantidad, subtotal_venta) VALUES
(1, 1, 1, 1600.00),
(2, 2, 2, 104.00),
(3, 3, 3, 90.00);

-- STORE PROCEDURES
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_productos`(
	  IN filaInicial INT, 
    IN limite INT, 
    IN colOrden VARCHAR(50), 
    IN dirOrden VARCHAR(4)
    )
BEGIN
	  DECLARE colValida VARCHAR(50);
    DECLARE dirValida VARCHAR(4);

	  SET @limite = IFNULL(limite, 10);
    SET @filaInicial = IFNULL(filaInicial, 0);

    -- Validar columna de ordenamiento
    SET colValida = CASE 
        WHEN colOrden = 'nombre_producto' THEN 'nombre_producto'
        WHEN colOrden = 'precio_lista' THEN 'precio_lista'
        WHEN colOrden = 'stock_actual' THEN 'stock_actual'
        ELSE 'nombre_producto'
    END;

    -- Validar direccion de ordenamiento
    SET dirValida = CASE 
        WHEN UPPER(dirOrden) = 'ASC' THEN 'ASC'
        WHEN UPPER(dirOrden) = 'DESC' THEN 'DESC'
        ELSE 'ASC'
    END;

    SET @consulta = CONCAT('
        SELECT 
            p.id_producto,
            p.nombre_producto,
            p.stock_actual,
            p.precio_lista,
            c.descripcion AS categoria_producto
        FROM 
            productos AS p
        JOIN 
            categorias_producto AS c ON p.id_categoria = c.id_categoria
        ORDER BY ', colValida, ' ', dirValida, '
        LIMIT ? OFFSET ?
    ');

    PREPARE sp_get_productos FROM @consulta;
    EXECUTE sp_get_productos USING @limite, @filaInicial;
    DEALLOCATE PREPARE sp_get_productos;
END$$
DELIMITER ;

DELIMITER //
CREATE PROCEDURE spModificarProducto(
   IN nombreProducto VARCHAR(100), IN stockActual INT, IN precioLista DECIMAL(10,2), 
   IN descuentoUno DECIMAL(10,2), IN costoIntermedio DECIMAL(10,2), IN descuentoDos DECIMAL(10,2),
   IN costoFinal DECIMAL(10,2), IN incremento DECIMAL(10,2), IN precioSugerido DECIMAL(10,2),
   IN precioFinal DECIMAL(10,2), IN ganancia DECIMAL(10,2), 
   IN idCategoria INT, IN idFabrica INT, IN idProducto INT)
BEGIN 
		UPDATE productos 
        SET nombre_producto = nombreProducto, stock_actual = stockActual, precio_lista = precioLista, 
        descuento_uno = descuentoUno, costo_intermedio = costoIntermedio, descuento_dos = descuentoDos, 
        costo_final = costoFinal, incremento = incremento, precio_sugerido = precioSugerido, 
        precio_final = precioFinal, ganancia = ganancia, id_categoria = idCategoria, id_fabrica = idFabrica
    WHERE id_producto = idProducto;
END//
DELIMITER ;

CREATE DEFINER=`root`@`localhost` PROCEDURE `spNuevoProducto`(
    IN nombre_producto VARCHAR(100),
    IN stock_actual INT,
    IN precio_lista DECIMAL(10, 2),
    IN descuento_uno DECIMAL(10, 2),
    IN costo_intermedio DECIMAL(10, 2),
    IN descuento_dos DECIMAL(10, 2),
    IN costo_final DECIMAL(10, 2),
    IN incremento DECIMAL(10, 2),
    IN precio_sugerido DECIMAL(10, 2),
    IN precio_final DECIMAL(10, 2),
    IN ganancia DECIMAL(10, 2),
    IN id_categoria INT,
    IN id_fabrica INT
)
BEGIN
    INSERT INTO productos (nombre_producto, stock_actual, precio_lista, descuento_uno, 
    costo_intermedio, descuento_dos, costo_final, incremento, precio_sugerido, 
    precio_final, ganancia, id_categoria, id_fabrica)
    VALUES (nombre_producto, stock_actual, precio_lista, descuento_uno, 
    costo_intermedio, descuento_dos, costo_final, incremento, precio_sugerido, 
    precio_final, ganancia, id_categoria, id_fabrica);
END
