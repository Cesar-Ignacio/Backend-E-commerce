import mongoose from "mongoose";
import sendResponse from "../utils/sendResponse.js";

const validateObjectIds = (req, res, next) => {
    for (const [key, value] of Object.entries(req.params)) {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            req.logger.warning(`Invalid ID: '${value}' in the '${key}' field. ${res.req.originalUrl}`)
            return sendResponse(res, 400, false, `Invalid ID: '${value}' in the '${key}' field.`)
        }
    }
    next();
};

export default validateObjectIds;