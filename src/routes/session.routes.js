import { Router } from "express";
import passport from "passport";
import sessionController from "../controllers/sessions.controller.js";
import { initAuthStrategies, passportCall } from "../auth/passport.strategies.js";
import { validateRequest } from "../middleware/validateRequest.middleware.js";
import { loginSchema } from "../schema/auth.schema.js";
import { handlePolice } from "../middleware/handlePolice.middleware.js";
import sendResponse from "../utils/sendResponse.js";
import CustomError from "../error/customError.error.js";
import errorsDictionary from "../error/errorDictionary.error.js";

const routesSession = Router();

initAuthStrategies();

routesSession.post('/login', validateRequest(loginSchema), passportCall('login'), sessionController.handleLoginPassportLocal)

routesSession.get('/current', handlePolice(["USER", "PRIMIUM", "ADMIN"]), sessionController.hadleCurrent)

routesSession.get('/ghlogin', passport.authenticate('ghlogin', { scope: ['user'] }), async (req, res) => {
});

routesSession.get('/ghlogincallback', passportCall('ghlogin'), async (req, res) => {
    try {
        // req.user es inyectado AUTOMATICAMENTE por Passport al parsear el done()
        req.session.user = req.user;
        req.session.save(err => {

            if (err) {
                const errordData = {
                    method: req.method,
                    action: "Auntenticacion GitHub",
                    url: req.url,
                    message: err.message
                }
               return next(new CustomError(errorsDictionary.INTERNAL_ERROR, errordData));
            }
            req.logger.info(`${req.method} ${req.url} inicio de sesion ${req.user.email}`)
            res.redirect('/');
        });
    } catch (error) {
        console.error('Error de autenticación GitHub', error.message);
        error.method = req.method
        error.action = "Auntenticacion GitHub";
        error.url = req.url;
        next(new CustomError(errorsDictionary.INTERNAL_ERROR, error));
        //new CustomError(errorsDictionary.INTERNAL_ERROR,)
        //res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

routesSession.post("/logout", handlePolice(["USER", "PRIMIUM", "ADMIN"]), sessionController.handleLogout)

export default routesSession;