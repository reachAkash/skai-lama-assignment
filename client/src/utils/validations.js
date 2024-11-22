import * as Yup from "yup";

export const projectValidationSchema = Yup.object({
  projectName: Yup.string()
    .min(2, "Project name must be at least 2 characters long")
    .required("Project name can't be empty"),
});

export const fileSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .required("Name is required"),
  transcript: Yup.string()
    .min(10, "Transcript must be at least 10 characters long")
    .required("Transcript is required"),
});

export const userValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .required("username is required"),
});
