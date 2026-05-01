# Tarea 1 – Martes 28/04/26
# 📦 Sistema de Ventas
### Investigación Académica

## 🏫 UPDS Sub Sede La Paz
**Universidad Privada Domingo Savio**  
Ingeniería en Sistemas | Base de Datos II

👤 Leonardo Javier Jauregui Miranda  
👤 Daynor Mateo Mollericona Aliaga  
📍 La Paz – Bolivia | Abril 2026

---

## 📌 ¿Qué es un Sistema de Ventas?

Un sistema de ventas es una aplicación de software que permite a una empresa **registrar, controlar y administrar** toda la operación comercial de venta de productos o servicios. Centraliza en un solo entorno la gestión de clientes, productos, inventario, facturación, cobros y reportes, eliminando el uso de registros manuales y reduciendo errores humanos.

**Ejemplo práctico:** una tienda usa el sistema para registrar qué producto se vendió, a qué cliente, cuánto pagó y cuántas unidades quedan en inventario, todo en tiempo real.

---

## 🔗 Proyecto de Referencia

Este trabajo se basa en el análisis del siguiente repositorio:

> **SisVentas** – Sistema de Ventas en C# con Windows Forms y SQL Server  
> 🔗 https://github.com/robertlluberes/SisVentas  
> Autor: Robert Lluberes

---

## 💻 Lenguaje y Tecnologías

El proyecto está desarrollado en **C# (.NET Framework)**, un lenguaje de programación orientado a objetos creado por Microsoft, fuertemente tipado, compilado y de propósito general. Es ampliamente utilizado para desarrollo de aplicaciones de escritorio, sistemas empresariales y servicios web.

| Tecnología | Uso en el proyecto |
|---|---|
| **C# (.NET Framework)** | Lenguaje principal de programación |
| **Windows Forms (WinForms)** | Framework para construir la interfaz gráfica de escritorio |
| **SQL Server 2008 R2** | Motor de base de datos relacional |
| **Visual Studio 2015** | Entorno de desarrollo (IDE) |
| **RDLC Report Designer** | Generación de reportes y comprobantes de venta |
| **Encriptación de contraseñas** | Seguridad en el acceso de usuarios |
| **Backup de base de datos** | Respaldo y recuperación de información |

### ¿Por qué C#?

- **Orientado a objetos:** permite modelar cada entidad del sistema (Cliente, Producto, Venta) como una clase con atributos y métodos propios
- **Fuertemente tipado:** reduce errores en tiempo de ejecución al validar tipos de datos en compilación
- **Integración con SQL Server:** a través de `ADO.NET`, C# se conecta de forma nativa y eficiente con bases de datos SQL Server
- **Windows Forms:** permite construir interfaces gráficas de escritorio con formularios, botones, grillas y menús de manera visual y rápida
- **Gran ecosistema:** acceso a miles de librerías del ecosistema .NET para seguridad, reportes, validaciones y más

---

## 🏗️ Arquitectura en N-Capas

El sistema implementa una **arquitectura en N-Capas (N-Tier)**, un patrón de diseño que separa las responsabilidades del sistema en capas independientes. Cada capa solo se comunica con la inmediatamente adyacente, lo que facilita el mantenimiento, las pruebas y la escalabilidad.
┌─────────────────────────────────────┐
│        CapaPresentacion             │  ← Formularios WinForms (UI)
│  Formularios, botones, grillas      │
├─────────────────────────────────────┤
│          CapaNegocio                │  ← Lógica y reglas del negocio
│  Validaciones, cálculos, procesos   │
├─────────────────────────────────────┤
│           CapaDatos                 │  ← Acceso a datos (ADO.NET)
│  Consultas SQL, conexión, comandos  │
├─────────────────────────────────────┤
│        Base de Datos                │  ← SQL Server (dbventas)
│  Tablas, relaciones, integridad     │
└─────────────────────────────────────┘
| Capa | Carpeta en el proyecto | Responsabilidad |
|---|---|---|
| Presentación | `CapaPresentacion` | Interfaz gráfica con la que interactúa el usuario |
| Negocio | `CapaNegocio` | Lógica del sistema, validaciones y reglas del negocio |
| Datos | `CapaDatos` | Conexión a SQL Server, consultas y comandos SQL |
| Base de Datos | `dbventas` | Almacenamiento persistente de toda la información |

---

## 🧩 Componentes del Sistema

| Componente | Descripción | Relación |
|---|---|---|
| **Cliente** | Persona que compra productos o servicios | Realiza muchas ventas |
| **Producto / Artículo** | Bien ofrecido a la venta | Pertenece a una categoría |
| **Categoría** | Clasificación de productos | Agrupa muchos productos |
| **Inventario / Stock** | Unidades disponibles de cada producto | Se actualiza por cada venta |
| **Venta** | Registro formal de la transacción comercial | Tiene un cliente y varios detalles |
| **Detalle de Venta** | Línea de producto dentro de una venta | Vincula venta con producto |
| **Pago** | Forma y monto con que el cliente cancela | Asociado a una venta |
| **Usuario / Vendedor** | Persona autorizada para operar el sistema | Tiene un rol asignado |
| **Proveedor** | Empresa que suministra los productos | Relacionado con artículos |
| **Reporte** | Resumen estadístico de ventas e ingresos | Generado desde los datos de ventas |

---

## 🗄️ Base de Datos – dbventas

La base de datos se llama `dbventas` y puede crearse ejecutando el script `dbventas_Script.sql` incluido en el repositorio, o restaurando el archivo `dbventas_Backup.bak`. Implementa **integridad referencial** mediante claves foráneas entre tablas.

### Tablas principales

| Tabla | Campos clave | Descripción |
|---|---|---|
| `Clientes` | IdCliente, Nombre, Apellido, Correo, Telefono | Datos personales y de contacto del cliente |
| `Articulos` | IdArticulo, Nombre, Precio, Stock, IdCategoria | Productos disponibles para la venta |
| `Categorias` | IdCategoria, Nombre | Clasificación de los artículos |
| `Ventas` | IdVenta, Fecha, IdCliente, IdUsuario, Total | Cabecera del comprobante de venta |
| `DetalleVenta` | IdDetalle, IdVenta, IdArticulo, Cantidad, Precio | Líneas de productos por cada venta |
| `Usuarios` | IdUsuario, Usuario, Clave, Rol | Acceso al sistema con contraseña encriptada |
| `Proveedores` | IdProveedor, Nombre, Contacto | Datos de los proveedores de productos |

### Relaciones principales
Clientes      ──< Ventas >──────── DetalleVenta >── Articulos
│                                    │
Usuarios                           Categorias
---

## 📋 Reglas del Negocio

Las reglas del negocio son las condiciones que el sistema valida para garantizar operaciones correctas e íntegras.

### Stock e Inventario
- ❌ No se puede vender un producto si su stock es `0`
- ✅ Al confirmar una venta, el stock se descuenta automáticamente
- ❌ El stock nunca puede quedar en valor negativo

### Ventas y Facturación
- ✅ Cada venta debe contener al menos un producto
- ✅ El sistema calcula automáticamente subtotal, impuestos y total
- ✅ El monto pagado debe ser **igual o mayor** al total de la venta
- ✅ Cada comprobante tiene un número de venta único e irrepetible
- ✅ Un cliente puede realizar múltiples ventas
- ✅ Una venta puede incluir múltiples productos distintos

### Productos
- ❌ El precio de un producto no puede ser negativo ni cero
- ✅ Cada producto debe pertenecer a una categoría
- ✅ El código o nombre del producto debe ser único en el sistema

### Seguridad y Acceso
- ✅ Solo usuarios registrados pueden acceder al sistema
- ✅ Las contraseñas se almacenan **encriptadas** en la base de datos
- ✅ Cada usuario tiene un rol: `Administrador`, `Vendedor` o `Almacenero`
- ✅ El rol determina qué módulos y acciones puede usar cada usuario

---

## 🖥️ Módulos Funcionales

### 🛒 Módulo de Ventas
Permite registrar nuevas ventas seleccionando el cliente y agregando productos. El sistema calcula el total automáticamente. Al confirmar, genera el comprobante y descuenta el inventario.

### 📦 Módulo de Inventario
Gestión completa de productos: registro, edición de precios, asignación de categorías y consulta de stock en tiempo real.

### 👥 Módulo de Clientes
Registro y administración de clientes: altas, modificaciones y consulta del historial de compras de cada cliente.

### 📊 Módulo de Reportes
Genera informes de ventas por período, productos más vendidos, ingresos totales y estado del inventario. Implementado con archivos `.rdlc` (RDLC Report Designer).

### 🔐 Módulo de Usuarios
Administración de cuentas de acceso, asignación de roles y gestión segura de contraseñas con encriptación.

### 💾 Módulo de Respaldo
Permite realizar backups de la base de datos `dbventas` para proteger la información ante posibles fallos del sistema.

---

## ✅ Conclusiones

1. Un sistema de ventas automatiza y centraliza el proceso comercial, eliminando errores manuales y mejorando la eficiencia de la empresa.
2. La arquitectura en N-Capas de C# permite separar claramente la interfaz, la lógica y los datos, facilitando el mantenimiento del sistema.
3. El uso de **ADO.NET** en C# permite una conexión robusta y eficiente con SQL Server para ejecutar consultas, inserciones y actualizaciones de datos.
4. Las reglas del negocio implementadas garantizan la integridad y consistencia de cada operación registrada en el sistema.
5. El proyecto SisVentas es un ejemplo real y completo de cómo aplicar los conceptos de Base de Datos II en un sistema de información empresarial funcional.

---

## 📎 Referencias

- Lluberes, R. *SisVentas*. GitHub. https://github.com/robertlluberes/SisVentas
- Microsoft. *Documentación de C# y .NET*. https://learn.microsoft.com/es-es/dotnet/csharp/
- Microsoft. *SQL Server Documentation*. https://learn.microsoft.com/es-es/sql/sql-server/
- Microsoft. *Windows Forms para .NET*. https://learn.microsoft.com/es-es/dotnet/desktop/winforms/


# Tarea 2 – Miércoles 29/04/2026

## 🗄️ Base de Datos – Sistema de Ventas

Script SQL para crear la base de datos completa del sistema de ventas con todas sus tablas y relaciones.

---

## 📁 Crear y seleccionar la base de datos

```sql
CREATE DATABASE sistema_ventas;
USE sistema_ventas;
```

---

## 📋 Tablas

### 👤 Usuarios
Almacena las cuentas de acceso al sistema con su rol y estado.
```sql
CREATE TABLE usuarios (
    id_usuario  INT PRIMARY KEY AUTO_INCREMENT,
    nombre      VARCHAR(100),
    usuario     VARCHAR(50),
    contrasena  VARCHAR(100),
    rol         VARCHAR(20),
    estado      BIT
);
```

---

### 🧑‍💼 Clientes
Datos personales y de contacto de los clientes.
```sql
CREATE TABLE clientes (
    id_cliente  INT PRIMARY KEY AUTO_INCREMENT,
    nombre      VARCHAR(100),
    ci          VARCHAR(20),
    telefono    VARCHAR(20),
    direccion   VARCHAR(150),
    email       VARCHAR(100),
    estado      BIT
);
```

---

### 🏷️ Categorías
Clasificación de los productos del sistema.
```sql
CREATE TABLE categorias (
    id_categoria  INT PRIMARY KEY AUTO_INCREMENT,
    nombre        VARCHAR(100),
    descripcion   VARCHAR(150),
    estado        BIT
);
```

---

### 🏭 Marcas
Marcas asociadas a los productos.
```sql
CREATE TABLE marcas (
    id_marca     INT PRIMARY KEY AUTO_INCREMENT,
    nombre       VARCHAR(100),
    descripcion  VARCHAR(150),
    estado       BIT
);
```

---

### 📦 Productos
Artículos disponibles para la venta, vinculados a categoría y marca.
```sql
CREATE TABLE productos (
    id_producto   INT PRIMARY KEY AUTO_INCREMENT,
    codigo        VARCHAR(50),
    nombre        VARCHAR(150),
    descripcion   VARCHAR(255),
    precio_venta  DECIMAL(10,2),
    stock         INT,
    id_categoria  INT,
    id_marca      INT,
    estado        BIT,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
    FOREIGN KEY (id_marca)     REFERENCES marcas(id_marca)
);
```

---

### 🚚 Proveedores
Empresas o personas que suministran los productos.
```sql
CREATE TABLE proveedores (
    id_proveedor  INT PRIMARY KEY AUTO_INCREMENT,
    nombre        VARCHAR(100),
    telefono      VARCHAR(20),
    direccion     VARCHAR(150),
    email         VARCHAR(100),
    estado        BIT
);
```

---

### 🛒 Ventas
Cabecera de cada transacción de venta realizada.
```sql
CREATE TABLE ventas (
    id_venta      INT PRIMARY KEY AUTO_INCREMENT,
    fecha         DATETIME,
    id_cliente    INT,
    id_usuario    INT,
    total         DECIMAL(10,2),
    descuento     DECIMAL(10,2),
    impuesto      DECIMAL(10,2),
    monto_pagado  DECIMAL(10,2),
    estado        BIT,
    FOREIGN KEY (id_cliente)  REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_usuario)  REFERENCES usuarios(id_usuario)
);
```

---

### 🧾 Detalle de Venta
Línea de productos incluidos en cada venta.
```sql
CREATE TABLE detalle_venta (
    id_detalle       INT PRIMARY KEY AUTO_INCREMENT,
    id_venta         INT,
    id_producto      INT,
    cantidad         INT,
    precio_unitario  DECIMAL(10,2),
    descuento        DECIMAL(10,2),
    subtotal         DECIMAL(10,2),
    FOREIGN KEY (id_venta)    REFERENCES ventas(id_venta),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);
```

---

### 📥 Compras
Registro de compras realizadas a proveedores.
```sql
CREATE TABLE compras (
    id_compra     INT PRIMARY KEY AUTO_INCREMENT,
    fecha         DATETIME,
    id_proveedor  INT,
    id_usuario    INT,
    total         DECIMAL(10,2),
    estado        BIT,
    FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor),
    FOREIGN KEY (id_usuario)   REFERENCES usuarios(id_usuario)
);
```

---

### 📋 Detalle de Compra
Línea de productos incluidos en cada compra.
```sql
CREATE TABLE detalle_compra (
    id_detalle_compra  INT PRIMARY KEY AUTO_INCREMENT,
    id_compra          INT,
    id_producto        INT,
    cantidad           INT,
    precio_unitario    DECIMAL(10,2),
    subtotal           DECIMAL(10,2),
    FOREIGN KEY (id_compra)   REFERENCES compras(id_compra),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);
```

---

## 🔗 Diagrama de Relaciones

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/cfc82926-ca48-426e-99fd-a9c3e3369e7f" />
<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/78fe536d-6c4f-4dc0-9c8b-30aed71a06e1" />

<img width="1600" height="845" alt="WhatsApp Image 2026-04-29 at 9 25 53 PM" src="https://github.com/user-attachments/assets/a517c0f4-a431-4cd9-a9bc-6190d302157a" />


<img width="1600" height="845" alt="WhatsApp Image 2026-04-29 at 9 25 53 PM" src="https://github.com/user-attachments/assets/099ee0d9-af2b-4ad8-be94-1504be0f7f4b" />

<img width="1600" height="847" alt="WhatsApp Image 2026-04-29 at 9 26 18 PM" src="https://github.com/user-attachments/assets/934effb9-dca7-4a20-a3e2-b29db62a9975" />

---

## 📝 Enunciado del Proyecto

**Empresa:** Distribuidora Sigma S.R.L.  
**Rubro:** Comercialización de material de escritorio

### Descripción

La empresa **Distribuidora Sigma S.R.L.** desea implementar una base de datos que le permita gestionar de manera eficiente sus operaciones de **ventas, compras e inventario**.

### Requerimientos identificados

**📦 Productos e Inventario**
- Productos organizados por categorías y marcas
- Cada producto tiene: código, nombre, descripción, precio de venta y stock
- Cada producto pertenece a una categoría y está asociado a una marca

**🚚 Proveedores**
- La empresa trabaja con múltiples proveedores
- Se registra: nombre, teléfono, dirección y correo electrónico
- Se lleva control de todas las compras realizadas a cada proveedor

**🧑‍💼 Clientes**
- Se atiende a distintos clientes
- Se almacena: nombre, CI, teléfono, dirección y correo electrónico

**🛒 Ventas**
- Realizadas por usuarios del sistema (empleados)
- Se registra: fecha, cliente, productos, cantidades, precios unitarios, descuentos, impuestos y monto total
- Cada venta puede incluir varios productos → se usa **detalle de venta**

**📥 Compras**
- Registradas por usuarios del sistema
- Se registra: fecha, proveedor, productos adquiridos, cantidades, precios y total
- Cada compra puede incluir varios productos → se usa **detalle de compra**

**🔐 Integridad de Datos**
- Se utilizan **claves primarias** y **claves foráneas** para relacionar las entidades
- Entidades relacionadas: Productos, Categorías, Marcas, Clientes, Proveedores, Usuarios, Ventas y Compras

---

## 🗂️ Entidades del Sistema

| Entidad | Descripción |
|---|---|
| **Producto** | Artículo de escritorio que se vende o compra |
| **Categoría** | Clasificación del producto (ej. cuadernos, bolígrafos) |
| **Marca** | Marca comercial del producto |
| **Cliente** | Persona que realiza una compra en la distribuidora |
| **Proveedor** | Empresa que suministra los productos |
| **Usuario** | Empleado que opera el sistema |
| **Venta** | Transacción de venta a un cliente |
| **Detalle Venta** | Desglose de productos de una venta |
| **Compra** | Adquisición de productos a un proveedor |
| **Detalle Compra** | Desglose de productos de una compra |

# Tarea 3 – Jueves 30/04/2026

## 📥 Inserción de Datos – Distribuidora Sigma S.R.L.

Scripts SQL para poblar la base de datos con datos de prueba y consultas para verificar los resultados.

---

## 👤 Usuarios
```sql
INSERT INTO usuarios (nombre, usuario, contrasena, rol, estado) VALUES
('Juan Perez',   'juan',   '123', 'admin',  1),
('Maria Lopez',  'maria',  '123', 'cajero', 1),
('Carlos Rojas', 'carlos', '123', 'cajero', 1),
('Ana Torres',   'ana',    '123', 'admin',  1),
('Luis Gomez',   'luis',   '123', 'cajero', 1),
('Sofia Vega',   'sofia',  '123', 'cajero', 1),
('Pedro Ruiz',   'pedro',  '123', 'admin',  1),
('Lucia Diaz',   'lucia',  '123', 'cajero', 1),
('Miguel Castro','miguel', '123', 'cajero', 1),
('Elena Flores', 'elena',  '123', 'admin',  1);
```

---

## 🧑‍💼 Clientes
```sql
INSERT INTO clientes (nombre, ci, telefono, direccion, email, estado) VALUES
('Cliente 1',  '1001', '70000001', 'Dir 1',  'c1@gmail.com',  1),
('Cliente 2',  '1002', '70000002', 'Dir 2',  'c2@gmail.com',  1),
('Cliente 3',  '1003', '70000003', 'Dir 3',  'c3@gmail.com',  1),
('Cliente 4',  '1004', '70000004', 'Dir 4',  'c4@gmail.com',  1),
('Cliente 5',  '1005', '70000005', 'Dir 5',  'c5@gmail.com',  1),
('Cliente 6',  '1006', '70000006', 'Dir 6',  'c6@gmail.com',  1),
('Cliente 7',  '1007', '70000007', 'Dir 7',  'c7@gmail.com',  1),
('Cliente 8',  '1008', '70000008', 'Dir 8',  'c8@gmail.com',  1),
('Cliente 9',  '1009', '70000009', 'Dir 9',  'c9@gmail.com',  1),
('Cliente 10', '1010', '70000010', 'Dir 10', 'c10@gmail.com', 1);
```

---

## 🏷️ Categorías
```sql
INSERT INTO categorias (nombre, descripcion, estado) VALUES
('Cuadernos',   'Utiles escolares', 1),
('Lapices',     'Escritura',        1),
('Boligrafos',  'Escritura',        1),
('Marcadores',  'Dibujo',           1),
('Resaltadores','Oficina',          1),
('Carpetas',    'Archivo',          1),
('Hojas',       'Papel',            1),
('Reglas',      'Medicion',         1),
('Tijeras',     'Herramienta',      1),
('Pegamento',   'Adhesivo',         1);
```

---

## 🏭 Marcas
```sql
INSERT INTO marcas (nombre, descripcion, estado) VALUES
('Faber Castell', 'Alta calidad', 1),
('Bic',           'Popular',      1),
('Norma',         'Escolar',      1),
('Artesco',       'Oficina',      1),
('Pilot',         'Premium',      1),
('Maped',         'Escolar',      1),
('Stabilo',       'Marcadores',   1),
('Paper Mate',    'Escritura',    1),
('Sharpie',       'Marcadores',   1),
('UHU',           'Pegamento',    1);
```

---

## 📦 Productos
```sql
INSERT INTO productos (codigo, nombre, descripcion, precio_venta, stock, id_categoria, id_marca, estado) VALUES
('P001', 'Cuaderno A',     'Cuaderno 100 hojas', 10, 50,  1,  3, 1),
('P002', 'Lapiz HB',       'Lapiz grafito',       2, 100, 2,  1, 1),
('P003', 'Boligrafo Azul', 'Tinta azul',          3, 80,  3,  2, 1),
('P004', 'Marcador Negro', 'Punta gruesa',         5, 60,  4,  9, 1),
('P005', 'Resaltador',     'Color amarillo',       4, 70,  5,  7, 1),
('P006', 'Carpeta',        'Plastica',             6, 40,  6,  4, 1),
('P007', 'Hojas Bond',     'Paquete 100',         15, 30,  7,  3, 1),
('P008', 'Regla 30cm',     'Plastica',             3, 90,  8,  6, 1),
('P009', 'Tijera',         'Escolar',              8, 35,  9,  6, 1),
('P010', 'Pegamento',      'Barra',                5, 55, 10, 10, 1);
```

---

## 🚚 Proveedores
```sql
INSERT INTO proveedores (nombre, telefono, direccion, email, estado) VALUES
('Proveedor 1',  '70011111', 'Dir P1',  'p1@gmail.com',  1),
('Proveedor 2',  '70022222', 'Dir P2',  'p2@gmail.com',  1),
('Proveedor 3',  '70033333', 'Dir P3',  'p3@gmail.com',  1),
('Proveedor 4',  '70044444', 'Dir P4',  'p4@gmail.com',  1),
('Proveedor 5',  '70055555', 'Dir P5',  'p5@gmail.com',  1),
('Proveedor 6',  '70066666', 'Dir P6',  'p6@gmail.com',  1),
('Proveedor 7',  '70077777', 'Dir P7',  'p7@gmail.com',  1),
('Proveedor 8',  '70088888', 'Dir P8',  'p8@gmail.com',  1),
('Proveedor 9',  '70099999', 'Dir P9',  'p9@gmail.com',  1),
('Proveedor 10', '70100000', 'Dir P10', 'p10@gmail.com', 1);
```

---

## 🛒 Ventas
```sql
INSERT INTO ventas (fecha, id_cliente, id_usuario, total, descuento, impuesto, monto_pagado, estado) VALUES
(NOW(), 1, 1, 50, 5, 2, 47, 1),
(NOW(), 2, 2, 30, 0, 1, 31, 1),
(NOW(), 3, 3, 20, 2, 1, 19, 1);
```

---

## 🧾 Detalle de Venta
```sql
INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario, descuento, subtotal) VALUES
(1, 1, 2, 10, 0, 20),
(1, 2, 5,  2, 0, 10),
(2, 3, 3,  3, 0,  9),
(3, 4, 2,  5, 0, 10);
```

---

## 📥 Compras
```sql
INSERT INTO compras (fecha, id_proveedor, id_usuario, total, estado) VALUES
(NOW(), 1, 1, 100, 1),
(NOW(), 2, 2, 150, 1);
```

---

## 📋 Detalle de Compra
```sql
INSERT INTO detalle_compra (id_compra, id_producto, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 10, 8, 80),
(2, 2, 20, 1, 20);
```

---

## 🔍 Consultas para verificar resultados

```sql
-- Ver todos los usuarios
SELECT * FROM usuarios;

-- Ver todos los clientes
SELECT * FROM clientes;

-- Ver productos con su categoría y marca
SELECT p.codigo, p.nombre, p.precio_venta, p.stock,
       c.nombre AS categoria, m.nombre AS marca
FROM productos p
JOIN categorias c ON p.id_categoria = c.id_categoria
JOIN marcas     m ON p.id_marca     = m.id_marca;

-- Ver ventas con nombre de cliente y usuario
SELECT v.id_venta, v.fecha, c.nombre AS cliente,
       u.nombre AS vendedor, v.total, v.monto_pagado
FROM ventas v
JOIN clientes  c ON v.id_cliente  = c.id_cliente
JOIN usuarios  u ON v.id_usuario  = u.id_usuario;

-- Ver detalle de ventas con nombre de producto
SELECT dv.id_venta, p.nombre AS producto,
       dv.cantidad, dv.precio_unitario, dv.subtotal
FROM detalle_venta dv
JOIN productos p ON dv.id_producto = p.id_producto;

-- Ver compras con proveedor y usuario
SELECT co.id_compra, co.fecha, pr.nombre AS proveedor,
       u.nombre AS usuario, co.total
FROM compras co
JOIN proveedores pr ON co.id_proveedor = pr.id_proveedor
JOIN usuarios    u  ON co.id_usuario   = u.id_usuario;

-- Ver detalle de compras con nombre de producto
SELECT dc.id_compra, p.nombre AS producto,
       dc.cantidad, dc.precio_unitario, dc.subtotal
FROM detalle_compra dc
JOIN productos p ON dc.id_producto = p.id_producto;
```
<img width="1600" height="848" alt="WhatsApp Image 2026-04-30 at 10 38 16 PM" src="https://github.com/user-attachments/assets/b3495bb5-0318-4ea9-86ec-0cadf285bc08" />
<img width="1600" height="846" alt="WhatsApp Image 2026-04-30 at 10 39 13 PM" src="https://github.com/user-attachments/assets/f934d691-43e8-4a42-a73c-813657b5842d" />
<img width="1600" height="848" alt="WhatsApp Image 2026-04-30 at 10 39 34 PM" src="https://github.com/user-attachments/assets/a00f844b-8897-4746-8eca-f83fe805701f" />

---

## 📊 Resultados esperados de las consultas

---

### 👤 Usuarios registrados
Al ejecutar `SELECT * FROM usuarios;` se obtienen los 10 usuarios del sistema, entre administradores y cajeros:

| id_usuario | nombre | usuario | rol | estado |
|---|---|---|---|---|
| 1 | Juan Perez | juan | admin | 1 |
| 2 | Maria Lopez | maria | cajero | 1 |
| 3 | Carlos Rojas | carlos | cajero | 1 |
| ... | ... | ... | ... | ... |
| 10 | Elena Flores | elena | admin | 1 |

---

### 🧑‍💼 Clientes registrados
Al ejecutar `SELECT * FROM clientes;` se listan los 10 clientes con su CI, teléfono y correo electrónico correctamente almacenados.

| id_cliente | nombre | ci | telefono | email |
|---|---|---|---|---|
| 1 | Cliente 1 | 1001 | 70000001 | c1@gmail.com |
| 2 | Cliente 2 | 1002 | 70000002 | c2@gmail.com |
| ... | ... | ... | ... | ... |
| 10 | Cliente 10 | 1010 | 70000010 | c10@gmail.com |

---

### 📦 Productos con categoría y marca
La consulta con `JOIN` entre `productos`, `categorias` y `marcas` muestra cada artículo con su clasificación completa:

| codigo | nombre | precio_venta | stock | categoria | marca |
|---|---|---|---|---|---|
| P001 | Cuaderno A | 10.00 | 50 | Cuadernos | Norma |
| P002 | Lapiz HB | 2.00 | 100 | Lapices | Faber Castell |
| P003 | Boligrafo Azul | 3.00 | 80 | Boligrafos | Bic |
| P004 | Marcador Negro | 5.00 | 60 | Marcadores | Sharpie |
| P005 | Resaltador | 4.00 | 70 | Resaltadores | Stabilo |
| ... | ... | ... | ... | ... | ... |

---

### 🛒 Ventas realizadas
La consulta de ventas muestra las 3 transacciones registradas, indicando el cliente atendido, el vendedor responsable y los montos:

| id_venta | fecha | cliente | vendedor | total | monto_pagado |
|---|---|---|---|---|---|
| 1 | 2026-04-30 | Cliente 1 | Juan Perez | 50.00 | 47.00 |
| 2 | 2026-04-30 | Cliente 2 | Maria Lopez | 30.00 | 31.00 |
| 3 | 2026-04-30 | Cliente 3 | Carlos Rojas | 20.00 | 19.00 |

---

### 🧾 Detalle de ventas
Se puede ver qué productos se vendieron en cada venta, con sus cantidades y subtotales:

| id_venta | producto | cantidad | precio_unitario | subtotal |
|---|---|---|---|---|
| 1 | Cuaderno A | 2 | 10.00 | 20.00 |
| 1 | Lapiz HB | 5 | 2.00 | 10.00 |
| 2 | Boligrafo Azul | 3 | 3.00 | 9.00 |
| 3 | Marcador Negro | 2 | 5.00 | 10.00 |

> La venta N°1 incluyó 2 productos distintos (Cuaderno y Lápiz), lo que demuestra que el modelo de detalle funciona correctamente.

---

### 📥 Compras a proveedores
Las 2 compras registradas muestran al proveedor que suministró los productos y el usuario que gestionó la compra:

| id_compra | fecha | proveedor | usuario | total |
|---|---|---|---|---|
| 1 | 2026-04-30 | Proveedor 1 | Juan Perez | 100.00 |
| 2 | 2026-04-30 | Proveedor 2 | Maria Lopez | 150.00 |

---

### 📋 Detalle de compras
Muestra los productos adquiridos en cada compra con sus cantidades y precios de costo:

| id_compra | producto | cantidad | precio_unitario | subtotal |
|---|---|---|---|---|
| 1 | Cuaderno A | 10 | 8.00 | 80.00 |
| 2 | Lapiz HB | 20 | 1.00 | 20.00 |

> Se puede observar que el precio de compra es menor al precio de venta, lo que refleja el margen de ganancia de la Distribuidora Sigma S.R.L.

---

## ✅ Conclusión de la Tarea

La inserción y consulta de datos se realizó correctamente, verificando que:
- Las **claves foráneas** funcionan sin errores, respetando la integridad referencial
- Los **JOINs** permiten obtener información completa cruzando múltiples tablas
- El modelo de **detalle de venta y compra** permite registrar múltiples productos por transacción
- Los **precios de compra son menores a los de venta**, reflejando la lógica comercial real de la empresa
