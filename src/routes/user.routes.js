import { Router } from "express";
import { handleCreateUserPassport } from "../controllers/users.controller.js";
import { modelUser } from "../dao/models/users.model.js";
import { validateRegistrationWithJoi } from "../middleware/validacionCampos.js";
import { initAuthStrategies, passportCall } from "../auth/passport.strategies.js";

const routesUser = Router();
initAuthStrategies();

routesUser.post('/createUser', validateRegistrationWithJoi, passportCall('register'), handleCreateUserPassport);

routesUser.get('/', async (req, res) => {
    const d = await modelUser.find().lean();
    res.send(d)
})
export default routesUser;