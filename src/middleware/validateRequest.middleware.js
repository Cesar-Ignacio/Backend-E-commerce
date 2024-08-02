import CustomError from "../error/customError.error.js";
import errorsDictionary from "../error/errorDictionary.error.js";

export const validateRequest = schema => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const errorData = {
                method: "middleware validateRequest",
                action: "Validaciòn de campos",
                message: error.details[0].message
            }
            req.logger.info(`${req.method} ${req.url} ${errorData.message}`);
            throw new CustomError(errorsDictionary.FEW_PARAMETERS, errorData);
        }
        next();
    }
}