const User = require("../models/user.models");
const { asyncHandler } = require("../utils/asyncHandler");
const {
  BAD_REQUEST,
  OK,
  CREATED,
  INTERNAL_SERVER_ERROR,
} = require("../utils/messageHelper");
const { successResponse, errorResponse } = require("../utils/responseHelper");

module.exports = {
  getUser: asyncHandler(async (req, res, next) => {
    try {
      // show list of users
      const users = await User.find();
      successResponse(res, 200, "Users fetched successfully!", users);
    } catch (err) {
      console.log(err);
      errorResponse(err, INTERNAL_SERVER_ERROR.statusCode, err.message);
    }
  }),
  createUser: asyncHandler(async (req, res, next) => {
    const { username } = req.body;
    // validate data
    if (!username) {
      return errorResponse(
        res,
        BAD_REQUEST.statusCode,
        `${BAD_REQUEST.message} : Username is required`
      );
    }
    // check if user already exist
    const user = await User.findOne({ username });
    // if exist give login
    if (user) {
      return successResponse(
        res,
        OK.statusCode,
        "User fetched successfully!",
        user
      );
    }
    // if user does not exist create a new user
    const newUser = await User.create({ username });
    // return new user
    return successResponse(res, CREATED.statusCode, CREATED.message, newUser);
  }),
};
