import Joi from "joi";

export const cartSchema = Joi.object({
    quantity: Joi.number().integer().min(1).required().messages({
        'number.min': 'La cantidad debe ser mayor o igual a 1',
        'number.base': 'La cantidad debe ser un número',
        'number.integer': 'La cantidad debe ser un número entero',
        'any.required': 'El campo cantidad es obligatorio'
    })
});