import sendResponse from "../utils/sendResponse.js";

export const validatePagination = schema => {
    return (req, res, next) => {
        const { error,value } = schema.validate(req.query);
        if (error) {
            return sendResponse(res, 400, false, error.details[0].message);
        }
        req.validatedQuery = value;
        next();
    }
}