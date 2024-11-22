const mongoose = require("mongoose");
const Project = require("../models/project.models");
const ProjectFile = require("../models/projectFile.models");
const User = require("../models/user.models");
const { asyncHandler } = require("../utils/asyncHandler");
const {
  OK,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  CREATED,
  FORBIDDEN,
} = require("../utils/messageHelper");
const { errorResponse, successResponse } = require("../utils/responseHelper");

module.exports = {
  getFile: asyncHandler(async (req, res, next) => {
    const { projectId } = req.body;
    // validate data
    if (!projectId) {
      return errorResponse(
        res,
        BAD_REQUEST.statusCode,
        `${BAD_REQUEST.message}: projectId is required!`
      );
    }

    try {
      // find all project with projectId
      const data = await ProjectFile.find({ projectId: projectId });

      // return found files
      successResponse(
        res,
        OK.statusCode,
        "Project files fetched successfully!",
        data
      );
    } catch (err) {
      console.log(err);
      errorResponse(err, INTERNAL_SERVER_ERROR.statusCode, err.message);
    }
  }),
  getSingleFile: asyncHandler(async (req, res, next) => {
    // fileId from params
    const { fileId } = req.params;
    // other important data from body
    const { projectId, userId } = req.body;

    // validate data
    if (!(fileId && projectId && userId)) {
      return errorResponse(
        res,
        BAD_REQUEST.statusCode,
        `${BAD_REQUEST.message}: fileId, projectId, and userId are required!`
      );
    }

    try {
      // find file with provided id
      const foundFile = await ProjectFile.findById(fileId);

      // if not found
      if (!foundFile) {
        return errorResponse(
          res,
          BAD_REQUEST.statusCode,
          `${BAD_REQUEST.message}: File not found!`
        );
      }

      // verify that file belongs to the provided project and user
      const foundProject = await Project.findOne({
        _id: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId),
      });

      // if no projects found
      if (!foundProject) {
        return errorResponse(
          res,
          BAD_REQUEST.statusCode,
          `${BAD_REQUEST.message}: Project not found or doesn't belong to this user!`
        );
      }

      // check if file is a part of project
      if (!foundProject.files.includes(fileId)) {
        return errorResponse(
          res,
          BAD_REQUEST.statusCode,
          `${BAD_REQUEST.message}: The file does not belong to the specified project!`
        );
      }

      // return found file
      return successResponse(
        res,
        OK.statusCode,
        "File retrieved successfully!",
        foundFile
      );
    } catch (err) {
      console.error(err);
      return errorResponse(
        res,
        INTERNAL_SERVER_ERROR.statusCode,
        `${INTERNAL_SERVER_ERROR.message}: Unable to retrieve the file due to server error!`
      );
    }
  }),
  createFile: asyncHandler(async (req, res, next) => {
    const { userId, projectId, name, transcript } = req.body;

    // validate data
    if (!(userId && projectId && name && transcript)) {
      return errorResponse(
        res,
        BAD_REQUEST.statusCode,
        `${BAD_REQUEST.message}: userId, project Id, file name and transcript are required!`
      );
    }

    try {
      // find user with provided userId
      const user = await User.findById(userId);
      // if no user found
      if (!user) {
        return errorResponse(
          res,
          BAD_REQUEST.statusCode,
          `${BAD_REQUEST.message}: User does not exist!`
        );
      }

      // check if project belongs to the user
      const foundProject = await Project.findOne({
        _id: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId),
      });

      // if no projects found
      if (!foundProject) {
        return errorResponse(
          res,
          BAD_REQUEST.statusCode,
          `${BAD_REQUEST.message}: Project does not exist or doesn't belong to this user!`
        );
      }

      // create new file
      const newFile = new ProjectFile({
        name: name,
        projectId: projectId,
        transcript: transcript,
      });

      // save the file document
      await newFile.save();

      // add fileId to projects array
      foundProject.files.push(newFile._id);

      // update last updated field
      foundProject.lastUpdated = new Date();

      // save updated project
      await foundProject.save();

      return successResponse(
        res,
        CREATED.statusCode,
        "File created successfully!",
        newFile
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
  updateFile: asyncHandler(async (req, res, next) => {
    const { fileId } = req.params;
    const { userId, projectId, transcript } = req.body;

    // Validate data
    if (!(fileId && userId && projectId && transcript)) {
      return errorResponse(
        res,
        BAD_REQUEST.statusCode,
        `${BAD_REQUEST.message}: fileId, projectId, userId, and transcript are required!`
      );
    }

    try {
      // find file by fileId
      const file = await ProjectFile.findById(fileId);
      // if not found
      if (!file) {
        return errorResponse(
          res,
          BAD_REQUEST.statusCode,
          `${BAD_REQUEST.message}: File does not exist!`
        );
      }

      // check if file belong to given projectId
      if (String(file.projectId) !== projectId) {
        return errorResponse(
          res,
          FORBIDDEN.statusCode,
          `${FORBIDDEN.message}: File does not belong to the specified project!`
        );
      }

      // check if project is owned by user
      const project = await Project.findById(projectId);

      // if not found
      if (!project || String(project.user) !== userId) {
        return errorResponse(
          res,
          FORBIDDEN.statusCode,
          `${FORBIDDEN.message}: You do not have permission to update this file!`
        );
      }

      // update data
      file.transcript = transcript;
      // save data
      await file.save();

      return successResponse(
        res,
        OK.statusCode,
        "File updated successfully!",
        file
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
  deleteFile: asyncHandler(async (req, res, next) => {
    // fileId from params
    const { fileId } = req.params;
    // important data from body
    const { projectId, userId } = req.body;

    // validate data
    if (!(fileId && projectId && userId)) {
      return errorResponse(
        res,
        BAD_REQUEST.statusCode,
        `${BAD_REQUEST.message}: fileId, projectId, and userId are required!`
      );
    }

    try {
      // find file by given fileId
      const foundFile = await ProjectFile.findById(fileId);
      // if not found
      if (!foundFile) {
        return errorResponse(
          res,
          BAD_REQUEST.statusCode,
          `${BAD_REQUEST.message}: File not found!`
        );
      }

      // check if file belongs to given projectId and userId
      const foundProject = await Project.findOne({
        _id: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId),
      });

      // if not found
      if (!foundProject) {
        return errorResponse(
          res,
          BAD_REQUEST.statusCode,
          `${BAD_REQUEST.message}: Project not found or doesn't belong to this user!`
        );
      }

      // check if file is part of given project
      if (!foundProject.files.includes(fileId)) {
        return errorResponse(
          res,
          BAD_REQUEST.statusCode,
          `${BAD_REQUEST.message}: The file does not belong to the specified project!`
        );
      }

      // remove file from the project's files array
      await Project.updateOne({ _id: projectId }, { $pull: { files: fileId } });

      // delete file
      await ProjectFile.findByIdAndDelete(fileId);

      return successResponse(res, OK.statusCode, "File deleted successfully!");
    } catch (err) {
      console.error(err);
      return errorResponse(
        res,
        INTERNAL_SERVER_ERROR.statusCode,
        `${INTERNAL_SERVER_ERROR.message}: Unable to delete the file due to server error!`
      );
    }
  }),
};
