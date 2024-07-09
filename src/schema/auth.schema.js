import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': 'El email no puede estar vacío',
      'string.email': 'Email inválido',
      'any.required': 'El campo email es obligatorio'
    }),
    password: Joi.string().required().messages({
      'string.empty': 'El campo contraseña no puede estar vacío',
      'any.required': 'El campo contraseña es obligatorio'
    })
  });