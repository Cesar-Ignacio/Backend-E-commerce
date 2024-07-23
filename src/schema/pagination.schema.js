import Joi from 'joi';

export const paginationSchema = Joi.object({
    limit: Joi.string().regex(/^\d+$/).default('3') // Acepta solo números como cadenas
        .custom((value, helpers) => parseInt(value, 10), 'Convert to integer'),
    page: Joi.string().regex(/^\d+$/).default(1) // Acepta solo números como cadenas
        .custom((value, helpers) => parseInt(value, 10), 'Convert to integer'),
    query: Joi.string().default('{}'),
    sort: Joi.string().regex(/^-1|1$/).default(1) // Acepta solo '-1' o '1' como cadenas
        .custom((value, helpers) => parseInt(value, 10), 'Convert to integer')
});