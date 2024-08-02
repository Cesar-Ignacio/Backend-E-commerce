class CustomError extends Error {
    constructor(errorData, { method = "unknown method", action = "unknown action", url = "_", message = " " }) {
        super(message);
        this.errorData = errorData;
        this.method = method;
        this.url = url;
        this.action = action;
    }
}

export default CustomError;