import multer from 'multer';

import sendResponse from '../utils/sendResponse.js';

// export const validateImageUpload = (req, res, next) => {
//     uploader.single('thumbnail')(req, res, (err) => {
//         if (err instanceof multer.MulterError) {
//             // Error de multer
//             return sendResponse(res, 400, false, err.message);
//         } else if (err) {
//             // Error de validación de archivo
//             return sendResponse(res, 400, false, err.message);
//         }
//         next();
//     });
// };
// export const validateImageUpload = (mett, name = 'thumbnail') => {
//     return (req, res, next) => {
        
//         mett.single(name)(req, res, (err) => {
//             if (err instanceof multer.MulterError) {
//                 // Error de multer
//                 return sendResponse(res, 400, false, err.message);
//             } else if (err) {
//                 // Error de validación de archivo
//                 return sendResponse(res, 400, false, err.message);
//             }
//             next();
//         });
//     }
// }

export const validateImageUpload= (multerInstance, uploadType = 'single', fieldName = 'thumbnail', maxArraySize = 10) => {
    return (req, res, next) => {
        let uploadHandler;

        // Selección del método de subida según el tipo
        switch (uploadType) {
            case 'single':
                uploadHandler = multerInstance.single(fieldName);
                break;
            case 'array':
                uploadHandler = multerInstance.array(fieldName, maxArraySize);
                break;
            default:
                return sendResponse(res, 400, false, 'Invalid upload type specified');
        }

        // Ejecución del método seleccionado
        uploadHandler(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                // Manejo de errores específicos de Multer
                return sendResponse(res, 400, false, `Multer error: ${err.message}`);
            } else if (err) {
                // Manejo de otros errores
                return sendResponse(res, 400, false, `File validation error: ${err.message}`);
            }
            next();
        });
    };
};
