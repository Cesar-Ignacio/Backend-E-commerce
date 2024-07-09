import Joi from "joi";

export const registerSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'string.empty': 'El campo Nombre no puede estar vacío',
        'any.required': 'El campo Nombre es obligatorio'

    }),
    lastName: Joi.string().required().messages({
        'string.empty': 'El campo Apellido no puede estar vacío',
        'any.required': 'El campo Apellido es obligatorio'
    }),
    age: Joi.number().integer().min(1).required().messages({
        'number.base': 'El campo edad debe ser un número',
        'number.integer': 'El campo edad debe ser un número entero',
        'number.min': 'El campo edad debe ser mayor o igual a 1',
        'any.required': 'El campo edad es obligatorio'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'El email no puede estar vacío',
        'string.email': 'Email inválido',
        'any.required': 'El campo email es obligatorio'
    }),
    password: Joi.string().required().messages({
        'any.required': 'El campo contraseña es obligatorio'
    })
});