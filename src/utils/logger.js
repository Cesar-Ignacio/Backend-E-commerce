import winston from "winston";
import { config } from "../config.js";

const validModes = ["PRODUCTION", "PROD"];

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

console.log(`MODE:${config.MODE}`)

const devLogger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevels.colors }),
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${new Date().toLocaleString()} [${level}]: ${message}`;
                })
            )
        })
    ]
})

const prodLogger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevels.colors }),
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}]: ${message}`;
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

const logger = isProductionMode(config.MODE) ? prodLogger : devLogger;

export default logger;