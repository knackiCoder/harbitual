const User = require('../models/user');
const {
   StatusCodes
} = require('http-status-codes');
const CustomError = require('../errors');
const {
   checkPermissions
} = require('../utils');
const catchAsync = require("../middleware/asyncHandler");

//Protected Route / Admin Only
//Get All Users..... => GET /api/v1/users

exports.getAllUsers = catchAsync(async (req, res) => {
   const users = await User.find({
      roles: 'User'
   }).select('-password');
   res.status(StatusCodes.OK).json({
      users
   })
})