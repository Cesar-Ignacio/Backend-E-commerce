import { Router } from "express";
import { handleCreateUserPassport } from "../controllers/users.controller.js";
import { modelUser } from "../dao/models/users.model.js";
import { initAuthStrategies, passportCall } from "../auth/passport.strategies.js";
import { validateRequest } from "../middleware/validateRequest.middleware.js";
import { registerSchema } from "../schema/register.schema.js";

const routesUser = Router();
initAuthStrategies();

routesUser.post('/createUser', validateRequest(registerSchema), passportCall('register'), handleCreateUserPassport);

routesUser.get('/', async (req, res) => {
    const d = await modelUser.find().lean();
    res.send(d)
})
export default routesUser;