import CustomError from "../error/customError.error.js";
import errorsDictionary from "../error/errorDictionary.error.js";
import sendResponse from "../utils/sendResponse.js";

export const validateRequest = schema => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            
            throw new CustomError(errorsDictionary.FEW_PARAMETERS, error.details[0].message);
            //return sendResponse(res, 400, false, error.details[0].message);
        }
        next();
    }
}