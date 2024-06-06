import express from 'express'
import { config } from './config.js';
import cartRoutes from './routes/cart.routes.js'
import productoRoutes from './routes/producto.routes.js'
import viewsRoutes from './routes/views.routes.js';
import { engine } from 'express-handlebars';
import { initSocketServer } from './sockets.js';
import mongoose from 'mongoose';
import messagesRoutes from './routes/message.routes.js';
import session from 'express-session';
import FileStore from 'session-file-store'
import routesSession from './routes/session.routes.js';
import routesUser from './routes/user.routes.js';

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

/**Configuracíon para session */
const fileStore = FileStore(session)
app.use(session({
    store: new fileStore({
    path: './sessions',ttl:100,retries:0
  }),
  secret: config.SECRET,
  resave: true,
  saveUninitialized: true
}))

/**Routes */
app.use("/api/carts", cartRoutes);
app.use("/api/products", productoRoutes);
app.use("/api/messages",messagesRoutes);
app.use("/api/session",routesSession);
app.use("/api/users",routesUser)
app.use(viewsRoutes);


/**Inicio de servidor */
const httpServer = app.listen(config.PORT, async() => {
    await mongoose.connect(config.MONGODB_URI);
    console.log(`Servidor activo en PORT:${config.PORT}`)
})

/**Inicio socket */
const socketServer = initSocketServer(httpServer);
app.set('socketServer', socketServer);



