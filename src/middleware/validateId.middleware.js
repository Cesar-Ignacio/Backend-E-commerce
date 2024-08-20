import mongoose from "mongoose";
import errorsDictionary from "../error/errorDictionary.error.js";
import CustomError from "../error/customError.error.js";

const validateObjectIds = (req, res, next) => {
    for (const [key, value] of Object.entries(req.params)) {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            req.logger.warning(`Invalid ID: '${value}' in the '${key}' field. ${res.req.originalUrl}`)
            throw new CustomError(errorsDictionary.INVALID_MONGOID_FORMAT, { message: `Invalid ID: '${value}' in the '${key}' field.` })
        }
    }
    next();
};
export default validateObjectIds;