const { StatusCodes } = require('http-status-codes');

const ErrorHandlerMiddleware = (err, req, res, next) => {
   let customError = {
      //set default
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      msg: err.message || 'something went wrong try again later',
      success: false
   };
   if (err.name === 'ValidationError') {
      customError.msg = Object.values(err.errors).map((item) => item.message).join(', ');
      customError.statusCode = 400
   }
   if (err.code && err.code === 11000) {
      customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field choose another value`;
      customError.statusCode = 400
   }
   if (err.name === 'castError') {
      customError.msg = `No item found with id : ${err.value}`
      customError.statusCode = 404
   }

   return res.status(customError.statusCode).json({ msg: customError.msg })
   
};

module.exports = ErrorHandlerMiddleware