const mongoose = require("mongoose");
const Project = require("../models/project.models");
const User = require("../models/user.models");
const { asyncHandler } = require("../utils/asyncHandler");
const {
  OK,
  BAD_REQUEST,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  CREATED,
} = require("../utils/messageHelper");
const { successResponse, errorResponse } = require("../utils/responseHelper");

module.exports = {
  getProject: asyncHandler(async (req, res, next) => {
    // extract userId
    const { userId } = req.body;

    // Check if userId is provided
    if (!userId) {
      return errorResponse(res, BAD_REQUEST.statusCode, "userId is required!");
    }

    try {
      // find all projects with provided userId
      const projects = await Project.find({
        user: new mongoose.Types.ObjectId(userId),
      });

      // if no projects found
      return successResponse(
        res,
        OK.statusCode,
        "Projects fetched successfully!",
        projects
      );
    } catch (err) {
      // Handle any errors during process
      console.error(err);
      return errorResponse(
        res,
        INTERNAL_SERVER_ERROR.statusCode,
        `${INTERNAL_SERVER_ERROR.message}: ${err.message}`
      );
    }
  }),

  createProject: asyncHandler(async (req, res, next) => {
    const { userId, name } = req.body;

    // Validate data
    if (!(userId && name)) {
      return errorResponse(
        res,
        BAD_REQUEST.statusCode,
        `${BAD_REQUEST.message}: userId and project name are required!`
      );
    }

    try {
      // find the user by userId
      const user = await User.findById(userId);
      // if no user found
      if (!user) {
        return errorResponse(
          res,
          BAD_REQUEST.statusCode,
          `${BAD_REQUEST.message}: User does not exist!`
        );
      }

      // check project with the same name exists
      const existingProject = await Project.findOne({ name, user: userId });
      // return if project with same name found
      if (existingProject) {
        return errorResponse(
          res,
          CONFLICT.statusCode,
          `Project with the name "${name}" already exists!`
        );
      }

      // create a new project
      const newProject = new Project({
        name: name,
        user: user._id,
        lastUpdated: new Date(),
      });

      // Save new project
      await newProject.save();

      // add the projectId to the user's projects array
      user.projects.push(newProject._id);
      // Save the user with the new project
      await user.save();

      // return with project
      return successResponse(
        res,
        CREATED.statusCode,
        "Project created successfully!",
        newProject
      );
    } catch (err) {
      console.error(err);
      return errorResponse(
        res,
        INTERNAL_SERVER_ERROR.statusCode,
        `${INTERNAL_SERVER_ERROR.message}: ${err.message}`
      );
    }
  }),

  getSingleProject: asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;
    const { userId } = req.body;

    // Validate data
    if (!(userId && projectId)) {
      return errorResponse(
        res,
        BAD_REQUEST.statusCode,
        `${BAD_REQUEST.message}: userId and project ID are required!`
      );
    }

    try {
      // find the project by projectId and check if belongs to the provided userId
      const project = await Project.findOne({
        _id: projectId,
        user: userId,
      });

      // If no project is found or project does not belong to the user
      if (!project) {
        return errorResponse(
          res,
          BAD_REQUEST.statusCode,
          `${BAD_REQUEST.message}: Project does not exist or does not belong to the user!`
        );
      }

      // Return the found project
      return successResponse(
        res,
        OK.statusCode,
        "Project fetched successfully!",
        project
      );
    } catch (err) {
      console.error(err);
      return errorResponse(
        res,
        INTERNAL_SERVER_ERROR.statusCode,
        `${INTERNAL_SERVER_ERROR.message}: ${err.message}!`
      );
    }
  }),
};
