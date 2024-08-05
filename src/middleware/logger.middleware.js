import winston from "winston";
import { config } from "../config.js";

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red bold',
        error: 'red',
        warning: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'blue'
    }
};

const validModes = ["PRODUCTION", "PROD"];

console.log(`MODE:${config.MODE}`)

const devLogger = (req, res) => winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevels.colors }),
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${new Date().toLocaleString()} [${level}]: ${req.method} ${res.req.originalUrl} ${message}`;
                })
            )
        })
    ]
});

const prodLogger = (req, res) => winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevels.colors }),
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${new Date().toLocaleString()} [${level}]: ${req.method} ${res.req.originalUrl} ${message}`;
                })
            )
        }),
        new winston.transports.File({
            level: 'error', filename: `${config.DIRNAME}/logs/errors.log`,
            format: winston.format.json()
        })
    ],

})

const isProductionMode = (mode) => {
    return validModes.includes(mode.toUpperCase());
};

const logMiddleware = (req, res, next) => {
    req.logger = isProductionMode(config.MODE) ? prodLogger(req, res) : devLogger(req, res);
    next();
}


export default logMiddleware