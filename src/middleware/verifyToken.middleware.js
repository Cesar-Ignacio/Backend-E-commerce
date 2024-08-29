import { config } from "../config.js";
import CustomError from "../error/customError.error.js";
import errorsDictionary from "../error/errorDictionary.error.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const cookieToken = req.signedCookies.token;
    if (!cookieToken) { return res.redirect('/passwordReset') };
    jwt.verify(cookieToken, config.SECRET, (err, payload) => {
        if (err) throw new CustomError(errorsDictionary.AUTHORIZATION_ERROR, { message: "Token no válido" });
        req.user = payload;
        next();
    });
}