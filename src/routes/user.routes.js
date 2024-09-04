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

function validateFileCount(req, res, next) {
    const files = req.files; // Asegúrate de que en el formulario usas enctype="multipart/form-data"

    console.log(files)
    /*if (!files || Object.keys(files).length !== 3) {
        return res.status(400).json({ error: 'Debes subir exactamente 3 documentos.' });
    }*/
    next();
}

routesUser.post('/createUser', validateRequest(registerSchema), passportCall('register'), userController.handleCreateUserPassport);

routesUser.put('/passwordReset', verifyToken, userController.hadlePasswordReset);

routesUser.put('/premium/:userId', handlePolice(["USER", "PREMIUM"]), validateObjectIds, userController.handleUserRoleChange);

routesUser.post('/:userId/documents', handlePolice(["USER", "PREMIUM"]), validateObjectIds, validateFileCount, validateFileUpload(uploader.document, 'array', 'documents'), userController.handleDocumentUpload)

export default routesUser;