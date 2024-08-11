class CustomError extends Error {
    constructor(errorData, { message = " " }) {
        super(message);
        this.errorData = errorData;
    }
}

export default CustomError;