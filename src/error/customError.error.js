class CustomError extends Error {
    constructor(errorData, { method = "unknown method", action = "unknown action", message = " " }) {
        super(message);
        this.errorData = errorData;
        this.method = method;
        this.action = action;
    }
}

export default CustomError;