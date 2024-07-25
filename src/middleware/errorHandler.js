import sendResponse from "../utils/sendResponse.js";

const errorHandle = (error, req, res, next) => {
    return sendResponse(res,error.status.status,false,error.message);
}

export default errorHandle;