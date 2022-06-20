const express = require('express');
const router = express.Router();
const { getAllUsers, getSingleUser, getCurrentUser, updateUser, deleteUser, updatePass,getUserStats } = require('../controller/userController');

const { authenticateUser, authorizedRoles } = require("../middleware/authenticated")
// Get All Users
router
  .route('/')
  .get(authenticateUser, authorizedRoles('Admin'), getAllUsers);

module.exports = router;