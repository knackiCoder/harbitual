const { StatusCodes } = require("http-status-code");
const CustomAPIError = require("./customError");

class NotFoundError extends CustomAPIError {
    constructor (message) {
        super(message);
        this.StatusCodes = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError;
