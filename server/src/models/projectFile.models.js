const mongoose = require("mongoose");

const ProjectFileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    transcript: {
      type: String,
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  { timestamps: true }
);

const ProjectFile = mongoose.model("ProjectFile", ProjectFileSchema);

module.exports = ProjectFile;
