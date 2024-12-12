class apiResponse {
    constructor(statusCode, data, message, success = true) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = success
        this.success = statusCode < 500
    }
}

export default apiResponse;