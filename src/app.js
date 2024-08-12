import express from 'express'
import { engine } from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

import { config } from './config.js';
import cartRoutes from './routes/cart.routes.js'
import productoRoutes from './routes/producto.routes.js'
import viewsRoutes from './routes/views.routes.js';
import { initSocketServer } from './sockets.js';
import messagesRoutes from './routes/message.routes.js';
import routesSession from './routes/session.routes.js';
import routesUser from './routes/user.routes.js';
import MongoSingleton from './db/mongo.singleton.js';
import routesMocking from './routes/mocking.routes.js';
import errorHandle from './middleware/errorHandler.middleware.js';
import addLogger from './middleware/logger.middleware.js';

const app = express();

/**Middleware de aplicacion */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(addLogger);

/**Configuracion para handlebars */
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', `${config.VIEWS_DIR}`);

/**Configuracion archivo estaticos */
app.use(`/static`, express.static(`${config.STATIC_DIR}`))

/**Configuracíon para session */
app.use(session({
  store: MongoStore.create({
    mongoUrl: config.MONGODB_URI,
    ttl: 60 * 20
  }),
  secret: config.SECRET,
  resave: true,
  saveUninitialized: true
}))
/**Configuracion para passport */

app.use(passport.initialize());
app.use(passport.session());

/**Routes */
app.get("/loggerTest", (req, res) => {
  res.status(200).send("<h2>Logger Test</h2>")
  req.logger.debug("Nivel debug");
  req.logger.http("Nivel http");
  req.logger.info("Nivel Info");
  req.logger.warning("Nivel Warning");
  req.logger.error("Nivel Warning");
  req.logger.fatal("Nivel Error");
})
app.use("/api/carts", cartRoutes);
app.use("/api/products", productoRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/sessions", routesSession);
app.use("/api/users", routesUser)
app.use("/mockingproducts", routesMocking)
app.use(viewsRoutes);

/**Middleware de manejo de errores */
app.use(errorHandle)

/**Inicio de servidor */
const httpServer = app.listen(config.PORT, async (req) => {
  MongoSingleton.getInstance();
  console.log(`Servidor activo en PORT:${config.PORT} PID:${process.pid}`)
})

/**Inicio socket */
const socketServer = initSocketServer(httpServer);
app.set('socketServer', socketServer);



