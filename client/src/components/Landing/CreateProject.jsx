import React, { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import Modal from "../common/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { projectValidationSchema } from "../../utils/validations";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userDetails, userProjects } from "../../recoil/atoms";
import { apiRoutes } from "../../api/apiRoutes";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const user = useRecoilValue(userDetails);
  const setProjects = useSetRecoilState(userProjects);
  const navigate = useNavigate();

  const handleCreateProject = async ({ projectName }) => {
    try {
      const response = await axiosInstance.post(apiRoutes.createProjectApi, {
        userId: user?._id,
        name: projectName,
      });
      console.log(response.data);
      if (response.data.success) {
        navigate("/projects");
        getProjects();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getProjects = async () => {
    try {
      const response = await axiosInstance.post(apiRoutes.getProjectApi, {
        userId: user._id,
      });
      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <button
        onClick={openModal}
        className="flex items-center justify-center m-auto bg-secondary hover:bg-white border border-secondary hover:text-secondary text-white px-4 py-2 rounded-md gap-1 duration-300"
      >
        <IoAddCircleOutline className="text-2xl" />
        Create New Project
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4">Create Project</h2>
        <Formik
          initialValues={{
            projectName: "",
          }}
          validationSchema={projectValidationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log("Form submitted:", values);
            handleCreateProject(values);
            resetForm();
            closeModal();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="text-start mb-4 space-y-2">
                <label htmlFor="projectName" className="font-medium mb-1">
                  Project Name
                </label>
                <Field
                  name="projectName"
                  type="text"
                  className="w-full border border-gray-300 py-2 px-3 rounded-md"
                />
                <ErrorMessage
                  name="projectName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-transparent border-none text-red-500 font-medium hover:text-red-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary border-primary text-white px-4 py-2 rounded-md"
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default CreateProject;
