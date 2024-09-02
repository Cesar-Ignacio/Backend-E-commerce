import { Router } from "express";
import userController from "../controllers/users.controller.js";
import { initAuthStrategies, passportCall } from "../auth/passport.strategies.js";
import { validateRequest } from "../middleware/validateRequest.middleware.js";
import { registerSchema } from "../schema/register.schema.js";
import validateObjectIds from "../middleware/validateId.middleware.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { handlePolice } from "../middleware/handlePolice.middleware.js";
import { validateFileUpload } from "../middleware/validateImageUpload.middleware.js";
import uploader from "../utils/uploader.js";

const routesUser = Router();

initAuthStrategies();

routesUser.post('/createUser', validateRequest(registerSchema), passportCall('register'), userController.handleCreateUserPassport);

routesUser.put('/passwordReset', verifyToken, userController.hadlePasswordReset);

routesUser.put('/premium/:userId', handlePolice(["ADMIN"]), validateObjectIds, userController.handleUserRoleChange);

routesUser.post('/:userId/documents', validateObjectIds, validateFileUpload(uploader.document, 'array', 'documents'), userController.handleDocumentUpload)

export default routesUser;