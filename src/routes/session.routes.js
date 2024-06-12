import { Router } from "express";
import {handleLoginPassportLocal, handleLogout } from "../controllers/sessions.controller.js";
import {validateLoginWithJoi } from "../middleware/validacionCampos.js";
import { initAuthStrategies } from "../auth/passport.strategies.js";
import passport from "passport";

const routesSession = Router();

initAuthStrategies();

routesSession.post('/login', validateLoginWithJoi,passport.authenticate('login') ,handleLoginPassportLocal)

routesSession.get('/getSession', (req, res) => {
    res.send(req.session.user)
})

routesSession.get('/ghlogin', passport.authenticate('ghlogin', {scope: ['user']}), async (req, res) => {
});

routesSession.get('/ghlogincallback', passport.authenticate('ghlogin'), async (req, res) => {
    try {
        req.session.user = req.user // req.user es inyectado AUTOMATICAMENTE por Passport al parsear el done()
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