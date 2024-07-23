import multer from 'multer';
import { uploader } from '../utils/uploader.js';
import sendResponse from '../utils/sendResponse.js';

export const validateImageUpload = (req, res, next) => {
    uploader.single('thumbnail')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Error de multer
            return sendResponse(res, 400, false, err.message);
        } else if (err) {
            // Error de validación de archivo
            return sendResponse(res, 400, false, err.message);
        }
        next();
    });
};