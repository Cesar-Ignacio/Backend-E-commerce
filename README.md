# BackEnd E-commerce 🛍️

API REST para la gestión de un Carrito de Compras, desarrollada con **Express.js**. Este proyecto proporciona endpoints para manejar productos, carritos y usuarios dentro de un sistema de e-commerce, incluyendo autenticación y manejo de roles.

![532shots-so.png](https://i.postimg.cc/nzPLGMgd/532shots-so.png)

[Ver Proyecto en Vivo](https://backend-e-commerce-y9ud.onrender.com "Ver Proyecto en Vivo")

## Características
- Gestión de productos (crear, leer, actualizar y eliminar productos).
- Sistema de autenticación basado en sesiones.
- Roles de usuario: usuario, premium, admin.
- Carrito de compras con múltiples productos.
- Pagos simulados y finalización de compra.

## Tecnologías Utilizadas
- **Node.js** con **Express.js** para el servidor.
- **MongoDB** como base de datos, manejado con **Mongoose**.
- **JWT/Sesiones** para la autenticación.
- **Multer** para la gestión de archivos (imágenes de productos).
- **Winston** para la gestión de logs.
- **Artillery** para pruebas de carga.

[![My Skills](https://skillicons.dev/icons?i=npm,nodejs,expressjs,mongodb)](https://skillicons.dev)

## Endpoints Principales
Aquí algunos de los principales endpoints de la API:

| Método | Endpoint                   | Descripción                              |
|--------|----------------------------|------------------------------------------|
| GET    | `/api/products`             | Listar productos                         |
| POST   | `/api/products`             | Crear un nuevo producto (admin/premium)  |
| PUT    | `/api/products/:id`         | Actualizar un producto (admin/premium)   |
| DELETE | `/api/products/:id`         | Eliminar un producto (admin/premium)     |
| POST   | `/api/carts`                | Crear un nuevo carrito                   |
| POST   | `/api/carts/:id/purchase`   | Finalizar compra                         |
[Ver](https://backend-e-commerce-y9ud.onrender.com/api/docs/)


## Instalación Local 
```bash
git clone https://github.com/Cesar-Ignacio/Backend-E-commerce.git
```
```bash
cd Backend-E-commerce
```
```bash
npm install
```
```bash
npm run dev
```

## Instrucciones para Ejecutar Localmente

1. Clonar el repositorio:
    ```bash
    git clone https://github.com/usuario/proyecto-ecommerce.git
    ```

2. Instalar las dependencias:
    ```bash
    cd proyecto-ecommerce
    npm install
    ```

3. Configurar variables de entorno en un archivo `.env`:
    ```plaintext
    PORT=3000
    MONGODB_URI=mongodb://localhost/ecommerce
    SESSION_SECRET=tu_secreto
    ```

4. Iniciar el servidor:
    ```bash
    npm start
    ```

5. Accede a la API en: `http://localhost:3000`.

## Documentación Completa

Para ver la documentación completa de los endpoints y los datos de prueba, visita:
- [Documentación de Endpoints y Respuestas]([ruta/a/tu/documentacion-endpoints](https://backend-e-commerce-y9ud.onrender.com/api/docs/))
- [Explicación y Datos de Prueba](https://automatic-doom-2f5.notion.site/Gu-a-de-Uso-y-Recursos-34baf4e0459c4a8ab4a9e38094b0aed0?pvs=4)

---
