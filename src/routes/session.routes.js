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

routesSession.get('/current', handlePolice(["USER", "PREMIUM", "ADMIN"]), sessionController.hadleCurrent)

routesSession.get('/ghlogin', passport.authenticate('ghlogin', { scope: ['user'] }), async (req, res) => { });

routesSession.get('/ghlogincallback', passportCall('ghlogin'), sessionController.handleLoginPassportGitHub)

routesSession.post("/logout", handlePolice(["USER", "PREMIUM", "ADMIN"]), sessionController.handleLogout)

export default routesSession;