import { Router } from "express";
import passport from "passport";
import { handleLoginPassportLocal, handleLogout } from "../controllers/sessions.controller.js";
import { initAuthStrategies, passportCall } from "../auth/passport.strategies.js";
import { validateRequest } from "../middleware/validateRequest.middleware.js";
import { loginSchema } from "../schema/auth.schema.js";

const routesSession = Router();

initAuthStrategies();

routesSession.post('/login', validateRequest(loginSchema), passportCall('login'), handleLoginPassportLocal)

routesSession.get('/current', (req, res) => {
    try {
        if (!req.session.user) {
            res.redirect('/login');
        }
        res.status(200).send({ status: false, message: 'ok', data: { user: req.session.user } })
    } catch ({ message }) {
        res.status(500).send({ status: false, message });
    }

})

routesSession.get('/ghlogin', passport.authenticate('ghlogin', { scope: ['user'] }), async (req, res) => {
});

routesSession.get('/ghlogincallback', passport.authenticate('ghlogin'), async (req, res) => {
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

routesSession.post("/logout", handleLogout)

export default routesSession;