const CustomError = require("../errors");
const catchAsync = require("../middleware/asyncHandler");
const jwt = require("jsonwebtoken");

exports.authenticateUser = catchAsync(async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if(!authHeader) {
        throw new CustomError.UnauthenticatedError("Unathorized Access");
    }

    const token = authHeader.split(" ")[1];
    const jwtToken = jwt.verify(token,process.env.JWT_ACCESS_TOKEN)

    // if(Date.now() <= jwtToken.exp * 1000) {
    //     throw new CustomError.UnauthorizedError("Token expired")
    // }
    
    if(!jwtToken) {
        throw new CustomError.UnauthenticatedError("Invalid Token")
    }

    req.user = jwtToken;
    next();
});

//authorized permission
exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
       if (!roles.includes(req.user.role)) {
          throw new CustomError.UnauthenticatedError("You're Unauthorized to access this route");
       }
 
       next();
    };
 };
