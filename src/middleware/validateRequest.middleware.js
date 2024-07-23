import sendResponse from "../utils/sendResponse.js";

export const validateRequest = schema => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return sendResponse(res, 400, false, error.details[0].message);
        }
        next();
    }
}