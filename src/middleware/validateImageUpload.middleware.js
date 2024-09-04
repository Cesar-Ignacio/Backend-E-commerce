import multer from 'multer';

import sendResponse from '../utils/sendResponse.js';
import CustomError from '../error/customError.error.js';
import errorsDictionary from '../error/errorDictionary.error.js';


export const validateFileUpload = (multerInstance, uploadType = 'single', fieldName = 'thumbnail', maxArraySize = 3) => {
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
                const errorMessage = `El tipo de carga especificado "${uploadType}" no es válido. Los valores permitidos son "single" o "array".`;
                req.logger.warning(errorMessage);
                return next(new CustomError(errorsDictionary.FEW_PARAMETERS, { message: errorMessage }));
        }
       
        // Ejecución del método seleccionado
        uploadHandler(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                // Manejo de errores específicos de Multer
                req.logger.warning(`${err.message} ${err.code}`)
                let errorResponse;
                switch (err.code) {
                    case 'LIMIT_FILE_SIZE':
                        errorResponse = errorsDictionary.MULTER_FILE_TOO_LARGE;
                        break;
                    case 'LIMIT_FILE_COUNT':
                        errorResponse = errorsDictionary.MULTER_TOO_MANY_FILES;
                        break;
                    case 'LIMIT_UNEXPECTED_FILE':
                        errorResponse = errorsDictionary.MULTER_LIMIT_UNEXPECTED_FILE;
                        break;
                    // Puedes agregar más casos según los errores de Multer que quieras manejar
                    default:
                        errorResponse = { code: 22, status: 400, message: `Multer error: ${err.message}` };
                }
                return next(new CustomError(errorResponse, { message: err.message }))
            } else if (err) {
                // Manejo de otros errores 
                req.logger.warning(`Error detected: ${err.message}`)
                return next(new CustomError(errorsDictionary.MULTER_INVALID_FILE_TYPE, { message: err.message }))
            }
            next();
        });
    };
};
