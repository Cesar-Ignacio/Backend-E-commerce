const errorsDictionary = {
    // Errores de servidor
    UNHANDLED_ERROR: { code: 0, status: 500, message: 'Error no identificado' },
    DATABASE_ERROR: { code: 8, status: 500, message: 'No se puede conectar a la base de datos' },
    INTERNAL_ERROR: { code: 9, status: 500, message: 'Error interno de ejecución del servidor' },
    RECORD_CREATION_ERROR: { code: 10, status: 500, message: 'Error al intentar crear el registro' },

    // Errores de autenticación y autorización
    AUTHORIZATION_ERROR: { code: 11, status: 403, message: 'No tiene permiso para acceder a este recurso' },
    PASSWORD_INCORRECT: { code: 23, status: 401, message: 'La contraseña es incorrecta' },
    PASSWORD_TOO_WEAK: { code: 24, status: 400, message: 'La contraseña no cumple con los requisitos de seguridad' },

    // Errores de parámetros y formato
    FEW_PARAMETERS: { code: 2, status: 400, message: 'Faltan parámetros obligatorios o se enviaron vacíos' },
    INVALID_MONGOID_FORMAT: { code: 3, status: 400, message: 'El ID no contiene un formato válido de MongoDB' },
    INVALID_PARAMETER: { code: 4, status: 400, message: 'El parámetro ingresado no es válido' },
    INVALID_TYPE_ERROR: { code: 5, status: 400, message: 'No corresponde el tipo de dato' },
    ID_NOT_FOUND: { code: 6, status: 400, message: 'No existe registro con ese ID' },
    NO_DOCUMENTS_PROVIDED: { code: 22, status: 400, message: 'No se enviaron documentos' },

    // Errores relacionados con usuarios, productos y carritos
    USER_NOT_FOUND: { code: 13, status: 404, message: 'No se encontró el usuario solicitado' },
    PRODUCT_NOT_FOUND: { code: 14, status: 404, message: 'No se encontró el producto solicitado' },
    CART_NOT_FOUND: { code: 15, status: 404, message: 'No se encontró el carrito solicitado' },
    CANNOT_ADD_OWN_PRODUCT: { code: 12, status: 400, message: 'No puede agregar su propio producto a su carrito' },
    RESOURCE_ALREADY_EXISTS: { code: 17, status: 409, message: 'El recurso ya existe' },

    // Errores de enrutamiento y página
    ROUTING_ERROR: { code: 1, status: 404, message: 'No se encuentra el endpoint solicitado' },
    PAGE_NOT_FOUND: { code: 7, status: 404, message: 'No se encuentra la página solicitada' },

    // Respuesta exitosa pero sin contenido
    EMPTY_CART: { code: 16, status: 400, message: 'El carrito está vacío' },

    // Errores de Multer
    MULTER_FILE_TOO_LARGE: { code: 18, status: 400, message: 'El archivo es demasiado grande' },
    MULTER_TOO_MANY_FILES: { code: 19, status: 400, message: 'Se han subido demasiados archivos' },
    MULTER_INVALID_FILE_TYPE: { code: 20, status: 400, message: 'Tipo de archivo no permitido' },
    MULTER_LIMIT_UNEXPECTED_FILE: { code: 21, status: 400, message: 'Se recibió un archivo inesperado' }
};



export default errorsDictionary;