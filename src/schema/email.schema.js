import Joi from "joi";

export const emailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'El email no puede estar vacío',
    'string.email': 'Email inválido',
    'any.required': 'El campo email es obligatorio'
  })
});