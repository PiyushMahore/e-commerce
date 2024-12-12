class apiError extends Error {
    constructor(statusCode, message, error = [], stack) {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.error = error
        if (stack) {
            this.stack = stack
        } else {
            apiError.captureStackTrace(this, this.constructor)
        }
    }
}

export default apiError;