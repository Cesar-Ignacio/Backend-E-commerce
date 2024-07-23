
import multer from 'multer';
import { config } from '../config.js';



const allowedImageMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp',
    'image/tiff'
];

const storage = multer.diskStorage({

    /**Destino donde se guardan las imagenes */
    destination: (req, file, cb) => {
        cb(null, config.UPLOAD_DIR);
    },

    /**Nombre de la imagen */
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

/**Validacion de  archivos */
const fileFilter = (req, file, cb) => {
    if (allowedImageMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Aceptar el archivo
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, BMP, WEBP, TIFF, and GIF are allowed.'), false); // Rechazar el archivo
    }
};

export const uploader = multer({ storage: storage, fileFilter: fileFilter });