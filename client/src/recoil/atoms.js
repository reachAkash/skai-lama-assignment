import { atom } from "recoil";

export const userDetails = atom({
  key: "username", // Unique key for this atom
  default: {}, // Default value
});

export const userProjects = atom({
  key: "projects",
  default: [],
});

export const currentProject = atom({
  key: "currentProject",
  default: "",
});

export const files = atom({
  key: "files",
  default: [],
});

export const currentFile = atom({
  key: "currentFile",
  default: {},
});
