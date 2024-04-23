import express from 'express'
import { config } from './config.js';
import carritoRoutes from './routes/carrito.routes.js'
import productoRoutes from './routes/producto.routes.js'
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/carts",carritoRoutes);
app.use("/api/products",productoRoutes);

app.listen(config.PORT, () => {
    console.log(`Servidor activo http://localhost:${config.PORT}/`)
})

