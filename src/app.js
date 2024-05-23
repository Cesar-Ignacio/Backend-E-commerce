import express from 'express'
import { config } from './config.js';
import carritoRoutes from './routes/carrito.routes.js'
import productoRoutes from './routes/producto.routes.js'
import viewsRoutes from './routes/views.routes.js';
import { engine } from 'express-handlebars';
import { initSocketServer } from './sockets.js';
import mongoose from 'mongoose';
import messagesRoutes from './routes/message.routes.js';

const app = express();
/**Middleware de aplicacion */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**Configuracion para handlebars */
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', `${config.VIEWS_DIR}`);

/**Configuracion archivo estaticos */
app.use(`/static`,express.static(`${config.STATIC_DIR}`))

/**Routes */
app.use("/api/carts", carritoRoutes);
app.use("/api/products", productoRoutes);
app.use("/api/messages",messagesRoutes);
app.use(viewsRoutes);

/**Inicio de servidor */
const httpServer = app.listen(config.PORT, async() => {
    await mongoose.connect(config.MONGODB_URI);
    console.log(`Servidor activo en PORT:${config.PORT}`)
})

/**Inicio socket */
const socketServer = initSocketServer(httpServer);
app.set('socketServer', socketServer);



