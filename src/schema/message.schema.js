import Joi from "joi";

export const messageSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'El email no puede estar vacío',
        'string.email': 'Email inválido',
        'any.required': 'El campo email es obligatorio'
    }),
    message: Joi.string().max(50).required().messages({
        'string.empty': 'El mensaje no puede estar vacío',
        'string.max': 'El mensaje no puede tener más de 50 caracteres',
        'any.required': 'El campo contraseña es obligatorio'
    })
});