import CustomError from "../error/customError.error.js";
import errorsDictionary from "../error/errorDictionary.error.js";
import Logger from "../utils/logger.js";

const addLogger = (req, res, next) => {
    req.logger = Logger;
    next();
}

export default addLogger