import Joi from "joi";


export const productSchema = Joi.object({
    title: Joi.string().min(3).max(100).required()
        .messages({
            'string.empty': 'El título es obligatorio.',
            'string.min': 'El título debe tener al menos 3 caracteres.',
            'string.max': 'El título no debe tener más de 100 caracteres.',
            'any.required': 'El campo title es obligatorio'
        }),
    description: Joi.string().min(10).max(500).required()
        .messages({
            'string.empty': 'La descripción es obligatoria.',
            'string.min': 'La descripción debe tener al menos 10 caracteres.',
            'string.max': 'La descripción no debe tener más de 500 caracteres.',
            'any.required': 'El campo descripción es obligatorio'
        }),
    price: Joi.number().greater(0).required()
        .messages({
            'number.base': 'El precio debe ser un número.',
            'number.greater': 'El precio debe ser mayor que 0.',
            'any.required': 'El campo precio es obligatorio'
        }),
    code: Joi.string().alphanum().min(3).max(30).required()
        .messages({
            'string.empty': 'El código es obligatorio.',
            'string.alphanum': 'El código solo puede contener caracteres alfanuméricos.',
            'string.min': 'El código debe tener al menos 3 caracteres.',
            'string.max': 'El código no debe tener más de 30 caracteres.',
            'any.required': 'El campo code es obligatorio'
        }),
    stock: Joi.number().integer().min(0).required()
        .messages({
            'number.base': 'El stock debe ser un número.',
            'number.integer': 'El stock debe ser un número entero.',
            'number.min': 'El stock no puede ser negativo.',
            'any.required': 'El campo stock es obligatorio'
        }),
    category: Joi.string().min(3).max(50).required()
        .messages({
            'string.empty': 'La categoría es obligatoria.',
            'string.min': 'La categoría debe tener al menos 3 caracteres.',
            'string.max': 'La categoría no debe tener más de 50 caracteres.'
        })
}).unknown(true);

/**
 * Con .unknown(true), el esquema permitirá que existan propiedades adicionales no definidas en el esquema sin lanzar un error.
 */