import { IoAddCircleOutline } from "react-icons/io5";
import Modal from "../common/Modal";
import { apiRoutes } from "../../api/apiRoutes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSetRecoilState } from "recoil";
import { userDetails } from "../../recoil/atoms";
import { useState } from "react";
import { userValidationSchema } from "../../utils/validations";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

const CreateUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const setUsername = useSetRecoilState(userDetails);
  const navigate = useNavigate();

  const { showToast } = useToast();

  const handleSuccess = (message) => {
    showToast(message, true);
  };

  const handleFailure = (message) => {
    showToast(message, false);
  };

  // creating user
  const handleCreateUser = async ({ username }) => {
    try {
      const response = await axiosInstance.post(apiRoutes.createUserApi, {
        username,
      });
      if (response.data.success) {
        setUsername(response.data.data);
        handleSuccess(response.data.message);
        navigate("/projects");
      }
    } catch (err) {
      console.log(err);
      handleFailure(err.message);
    }
  };

  return (
    <div className="">
      <button
        onClick={openModal}
        className="flex items-center justify-center m-auto bg-secondary hover:bg-white border border-secondary hover:text-secondary text-white px-4 py-2 rounded-md gap-1 duration-300"
      >
        <IoAddCircleOutline className="text-2xl" />
        Create Your Account
      </button>
      {/* reusable Modal container */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4">Welcome,</h2>
        {/* Form validation using Formik and Yup */}
        <Formik
          initialValues={{
            username: "",
          }}
          validationSchema={userValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handleCreateUser(values);
            resetForm();
            closeModal();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="text-start mb-4 space-y-2">
                <label htmlFor="projectName" className="font-medium mb-1">
                  Please Enter Your username
                </label>
                <Field
                  name="username"
                  type="text"
                  className="w-full border border-gray-300 py-2 px-3 rounded-md"
                />
                <ErrorMessage
                  name="username"
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
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default CreateUser;
