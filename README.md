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


#tarea 2 miercoles 29/04/2026

CREATE DATABASE sistema_ventas;
USE sistema_ventas;


CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    usuario VARCHAR(50),
    contrasena VARCHAR(100),
    rol VARCHAR(20),
    estado BIT
);

CREATE TABLE clientes (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    ci VARCHAR(20),
    telefono VARCHAR(20),
    direccion VARCHAR(150),
    email VARCHAR(100),
    estado BIT
);

CREATE TABLE categorias (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    descripcion VARCHAR(150),
    estado BIT
);

CREATE TABLE marcas (
    id_marca INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    descripcion VARCHAR(150),
    estado BIT
);

CREATE TABLE productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(50),
    nombre VARCHAR(150),
    descripcion VARCHAR(255),
    precio_venta DECIMAL(10,2),
    stock INT,
    id_categoria INT,
    id_marca INT,
    estado BIT,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
    FOREIGN KEY (id_marca) REFERENCES marcas(id_marca)
);

CREATE TABLE proveedores (
    id_proveedor INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    telefono VARCHAR(20),
    direccion VARCHAR(150),
    email VARCHAR(100),
    estado BIT
);

CREATE TABLE ventas (
    id_venta INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATETIME,
    id_cliente INT,
    id_usuario INT,
    total DECIMAL(10,2),
    descuento DECIMAL(10,2),
    impuesto DECIMAL(10,2),
    monto_pagado DECIMAL(10,2),
    estado BIT,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE detalle_venta (
    id_detalle INT PRIMARY KEY AUTO_INCREMENT,
    id_venta INT,
    id_producto INT,
    cantidad INT,
    precio_unitario DECIMAL(10,2),
    descuento DECIMAL(10,2),
    subtotal DECIMAL(10,2),
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE compras (
    id_compra INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATETIME,
    id_proveedor INT,
    id_usuario INT,
    total DECIMAL(10,2),
    estado BIT,
    FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE detalle_compra (
    id_detalle_compra INT PRIMARY KEY AUTO_INCREMENT,
    id_compra INT,
    id_producto INT,
    cantidad INT,
    precio_unitario DECIMAL(10,2),
    subtotal DECIMAL(10,2),
    FOREIGN KEY (id_compra) REFERENCES compras(id_compra),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

<img width="1600" height="845" alt="WhatsApp Image 2026-04-29 at 9 25 53 PM" src="https://github.com/user-attachments/assets/a517c0f4-a431-4cd9-a9bc-6190d302157a" />


<img width="1600" height="845" alt="WhatsApp Image 2026-04-29 at 9 25 53 PM" src="https://github.com/user-attachments/assets/099ee0d9-af2b-4ad8-be94-1504be0f7f4b" />

<img width="1600" height="847" alt="WhatsApp Image 2026-04-29 at 9 26 18 PM" src="https://github.com/user-attachments/assets/934effb9-dca7-4a20-a3e2-b29db62a9975" />

