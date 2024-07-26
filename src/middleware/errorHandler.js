import sendResponse from "../utils/sendResponse.js";

const errorHandle = (error, req, res, next) => {
    const errorDescription = {
        message: error.message, // atributo de clase padre error
        method: error.method,
        action: error.action
    }
    return sendResponse(res, error.errorData.status, false, error.errorData.message, { errorDescription });
}

export default errorHandle;