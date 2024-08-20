const errorsDictionary = {
    UNHANDLED_ERROR: { code: 0, status: 500, message: 'Error no identificado' },
    ROUTING_ERROR: { code: 1, status: 404, message: 'No se encuentra el endpoint solicitado' },
    FEW_PARAMETERS: { code: 2, status: 400, message: 'Faltan parámetros obligatorios o se enviaron vacíos' },
    INVALID_MONGOID_FORMAT: { code: 3, status: 400, message: 'El ID no contiene un formato válido de MongoDB' },
    INVALID_PARAMETER: { code: 4, status: 400, message: 'El parámetro ingresado no es válido' },
    INVALID_TYPE_ERROR: { code: 5, status: 400, message: 'No corresponde el tipo de dato' },
    CANNOT_ADD_OWN_PRODUCT: { code: 12, status: 400, message: 'No puede agregar su propio producto a su carrito' },
    USER_NOT_FOUND: { code: 13, status: 404, message: 'No se encontró el usuario solicitado' },
    PRODUCT_NOT_FOUND: { code: 14, status: 404, message: 'No se encontró el producto solicitado' },
    CART_NOT_FOUND: { code: 15, status: 404, message: 'No se encontró el carrrito solicitado' },
    ID_NOT_FOUND: { code: 6, status: 400, message: 'No existe registro con ese ID' },
    AUTHORIZATION_ERROR: { code: 11, status: 403, message: 'No tiene permiso para acceder a este recurso' },
    PAGE_NOT_FOUND: { code: 7, status: 404, message: 'No se encuentra la página solicitada' },
    DATABASE_ERROR: { code: 8, status: 500, message: 'No se puede conectar a la base de datos' },
    INTERNAL_ERROR: { code: 9, status: 500, message: 'Error interno de ejecución del servidor' },
    RECORD_CREATION_ERROR: { code: 10, status: 500, message: 'Error al intentar crear el registro' }
    // RECORD_CREATION_OK: { code: 11, status: 200, message: 'Registro creado' }
}

export default errorsDictionary;