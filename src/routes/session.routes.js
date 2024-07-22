import { Router } from "express";
import passport from "passport";
import sessionController from "../controllers/sessions.controller.js";
import { initAuthStrategies, passportCall } from "../auth/passport.strategies.js";
import { validateRequest } from "../middleware/validateRequest.middleware.js";
import { loginSchema } from "../schema/auth.schema.js";
import { handlePolice } from "../middleware/handlePolice.middleware.js";

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
            if (err) return res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });

            res.redirect('/');
        });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

routesSession.post("/logout", handlePolice(["USER", "PRIMIUM", "ADMIN"]), sessionController.handleLogout)

export default routesSession;