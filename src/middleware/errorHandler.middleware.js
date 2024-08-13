import sendResponse from "../utils/sendResponse.js";

const errorHandle = (error, req, res, next) => {
  
    const errorDescription = {
        message: error.message || 'Error no especificado', // atributo de clase padre error
        method: req.method,
        path: req.originalUrl,
    };
    
    const status = error.errorData?.status || 500; // Manejar si errorData es undefined
    const message = error.errorData?.message || 'Error en el servidor';

    return sendResponse(res, status, false, message, { errorDescription });

}

export default errorHandle;