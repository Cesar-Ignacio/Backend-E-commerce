import CustomError from "../error/customError.error.js";
import errorsDictionary from "../error/errorDictionary.error.js";
import sendResponse from "../utils/sendResponse.js";

export const validatePagination = schema => {
    return (req, res, next) => {
        const { error,value } = schema.validate(req.query);
        if (error) {
            throw new CustomError(errorsDictionary.INVALID_PARAMETER,{message:error.details[0].message})
        }
        req.validatedQuery = value;
        next();
    }
}