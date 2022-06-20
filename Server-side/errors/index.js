const CustomAPIError = require('./customError');
const BadRequestError = require("./BadRequestError");
const UnauthenticatedError = require('./unauthenticated');
const UnauthorizedError = require('./unauthorized');
const NotFoundError = require('./404');

module.exports = {
   CustomAPIError,
   BadRequestError,
   UnauthenticatedError,
   UnauthorizedError,
   NotFoundError,
};