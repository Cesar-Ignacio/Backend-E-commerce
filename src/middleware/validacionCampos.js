import Joi from "joi";

export const validateLogin = (req, res, next) => {
    const requiredFields = ['email', 'password'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({
            status: false,
            message: `Faltan los siguientes campos: ${missingFields.join(', ')}`,
            data: {}
        });
    }
    next();
}

export const validateLoginWithJoi = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Email inválido',
            'any.required': 'El campo email es obligatorio'
        }),
        password: Joi.string().required().messages({
            'any.required': 'El campo contraseña es obligatorio'
        })
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message,
            data: {}
        });
    }

    next();
}

export const validateRegistrationWithJoi = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().required().messages({
            'any.required': 'El campo Nombre es obligatorio'
        }),
        lastName: Joi.string().required().messages({
            'any.required': 'El campo Apellido es obligatorio'
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Email inválido',
            'any.required': 'El campo email es obligatorio'
        }),
        password: Joi.string().required().messages({
            'any.required': 'El campo contraseña es obligatorio'
        })
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message,
            data: {}
        });
    }

    next();
}