import mongoose from "mongoose";
import sendResponse from "../utils/sendResponse.js";

const validateObjectIds = (req, res, next) => {
    for (const [key, value] of Object.entries(req.params)) {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            console.log(`Invalid ID: '${value}' in the '${key}' field. Please check the format and existence of the cart.`)
            return sendResponse(res, 400, false, `Invalid ID: '${value}' in the '${key}' field. Please check the format and existence of the cart.`)
        }
    }
    next();
};

export default validateObjectIds;