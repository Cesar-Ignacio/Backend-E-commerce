
import multer from 'multer';
import { config } from '../config.js';
import path from 'path';



const allowedImageMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp',
    'image/tiff'
];

const allowedDocumentMimeTypes = [
    'application/pdf',            // PDF
    'application/msword',         // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/vnd.ms-excel',   // .xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-powerpoint', // .ppt
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
    'text/plain',                 // .txt
    'application/rtf'             // .rtf
];

const storage = multer.diskStorage({

    /**Destino donde se guardan los archivo */
    destination: (req, file, cb) => {
        let folder;
        if (file.fieldname === 'profileImage') {
            folder = 'profiles/';
        } else if (file.fieldname === 'productImage' || file.fieldname === 'thumbnail') {
            folder = 'products/';
        } else if (file.fieldname === 'document') {
            folder = 'documents/';
        }
        cb(null, `${config.UPLOAD_DIR}/${folder}`)
    },

    /**Nombre de archivo */
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
    // filename: (req, file, cb) => {
    //     cb(null, `${path.basename(file.originalname, path.extname(file.originalname))}-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`)
    // }
});

/**Validacion de  imagenes */
const validateImageFileType = (req, file, cb) => {
    if (allowedImageMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Aceptar el archivo
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, BMP, WEBP, TIFF, and GIF are allowed.'), false); // Rechazar el archivo
    }
};

/**Validacion de  documentes */
const documentFileFilter = (req, file, cb) => {
    if (allowedDocumentMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Aceptar el archivo
    } else {
        cb(new Error('Invalid file type. Only PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, and RTF are allowed.'), false); // Rechazar el archivo
    }
};

export const document = multer({ storage: storage, fileFilter: documentFileFilter })
export const product = multer({ storage: storage, fileFilter: validateImageFileType })
export const profiles = multer({ storage: storage, fileFilter: validateImageFileType });

export default { document, product, profiles }

// export const uploaderDos = multer({
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             let folder;
//             if (file.fieldname === 'profileImage') {
//                 folder = 'profiles/';
//             } else if (file.fieldname === 'productImage') {
//                 folder = 'products/';
//             } else if (file.fieldname === 'document') {
//                 folder = 'documents/';
//             }
//             cb(null, `${config.UPLOAD_DIR}/${folder}`)
//         },
//         filename: (req, file, cb) => cb(null, `${path.basename(file.originalname, path.extname(file.originalname))}-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`)
//     })
// });

// export const createUploader = (uploadDir) => {
//     return multer({
//         storage: multer.diskStorage({
//             destination: (req, file, cb) => cb(null, uploadDir),
//             filename: (req, file, cb) => {
//                 const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//                 const ext = path.extname(file.originalname);
//                 const basename = path.basename(file.originalname, ext);
//                 cb(null, `${basename}-${uniqueSuffix}${ext}`);
//             }
//         })
//     });
// };
