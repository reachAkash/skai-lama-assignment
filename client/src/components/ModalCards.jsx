import React, { useState } from "react";
import cloudImage from "../assets/images/cloudImg.svg";
import youtubeIcon from "../assets/images/youtubeIcon.svg";
import Modal from "../components/common/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Logo from "../assets/images/logo.svg";
import { fileSchema } from "../utils/validations";
import { apiRoutes } from "../api/apiRoutes";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentProject, files, userDetails } from "../recoil/atoms";
import axiosInstance from "../api/axiosInstance";
import { IoMdNotificationsOutline } from "react-icons/io";

export const ComingSoonSidebar = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="text-center">
      <div onClick={openModal}>{children}</div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="">
          <img className="w-[20%]" src={Logo} alt="logo" />
        </div>
        <h2 className="text-xl font-semibold mb-4">Feature Coming Soon...</h2>
      </Modal>
    </div>
  );
};

export const ComingSoonModal = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="text-center">
      <div
        onClick={openModal}
        className="border border-[#999999]/30 rounded-full p-2 cursor-pointer"
      >
        <IoMdNotificationsOutline className="text-2xl" />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {children}
      </Modal>
    </div>
  );
};

export const UploadPodcastCard = ({ item, idx }) => {
  return (
    <UploadFile2>
      <div className="bg-white flex items-center justify-between shadow-md rounded-md px-4 py-6 cursor-pointer transition-all ease-in-out duration-500 hover:scale-[1.02]">
        <div className="space-y-1">
          <div className="font-semibold text-2xl text-[#1D1929]">
            {item?.title}
          </div>
          <p className="text-[#646464]  max-w-[200px]">{item?.desc}</p>
        </div>
        <div className={`${idx == 2 && "bg-[#F3E8FF] pl-3 py-2 rounded-xl"} `}>
          <img className="w-3/4" src={item?.img} alt="upload image" />
        </div>
      </div>
    </UploadFile2>
  );
};

export const UploadPodcastCard2 = () => {
  return (
    <div className="bg-white shadow-md rounded-md text-center space-y-4 py-8 transition-all ease-in-out">
      <div className="flex items-center justify-center">
        <img src={cloudImage} alt="upload image" />
      </div>
      <div className="space-y-2">
        <p className="text-[#49454F] text-[18px]">
          Select a file or drag and drop here (Podcast Media or Transcription
          Text)
        </p>
        <p className="text-[#00000066] text-sm">
          MP4, MOV, MP3, WAV, PDF, DOCX or TXT file{" "}
        </p>
        <UploadFile>
          <div className="flex items-center justify-start gap-3 mb-2">
            <div>
              <img className="w-12" src={youtubeIcon} alt="youtube icon" />
            </div>
            <div className="text-[#3C3C3C] font-bold text-xl">
              Upload from Youtube
            </div>
          </div>
        </UploadFile>
      </div>
    </div>
  );
};

export const UploadFile = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useRecoilValue(userDetails);
  const currProject = useRecoilValue(currentProject);
  const setFiles = useSetRecoilState(files);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateFile = async ({ name, transcript }) => {
    try {
      const response = await axiosInstance.post(apiRoutes.createFile, {
        userId: user._id,
        projectId: currProject,
        name: name,
        transcript: transcript,
      });
      if (response.data.success) {
        getFiles();
        console.log("Hello data fetching");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getFiles = async () => {
    try {
      const response = await axiosInstance.post(apiRoutes.getFiles, {
        projectId: currProject,
      });
      setFiles(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={openModal}
        className="border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-full duration-300"
      >
        Select File
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex items-center justify-start gap-3 mb-2">
          <div>
            <img className="w-12" src={youtubeIcon} alt="youtube icon" />
          </div>
          <div className="text-[#3C3C3C] font-bold text-xl">
            Upload from Youtube
          </div>
        </div>
        <Formik
          initialValues={{
            projectName: "",
          }}
          validationSchema={fileSchema}
          onSubmit={(values, { resetForm }) => {
            handleCreateFile(values);
            resetForm();
            closeModal();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="text-start mb-2 space-y-2">
                <label htmlFor="name" className="font-medium mb-1">
                  Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className="w-full border border-gray-300 py-2 px-3 rounded-md"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="text-start mb-2 space-y-2">
                <label htmlFor="transcript" className="font-medium mb-1">
                  Transcript
                </label>
                <Field
                  name="transcript"
                  as="textarea"
                  rows="6"
                  type="text"
                  className="w-full border border-gray-300 py-2 px-3 rounded-md"
                />
                <ErrorMessage
                  name="transcript"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#211935] border border-[#211935] hover:bg-white hover:text-[#211935] text-white px-4 py-2 rounded-md duration-300"
                >
                  {isSubmitting ? "Uploading..." : "Upload"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export const UploadFile2 = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useRecoilValue(userDetails);
  const currProject = useRecoilValue(currentProject);
  const setFiles = useSetRecoilState(files);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateFile = async ({ name, transcript }) => {
    try {
      const response = await axiosInstance.post(apiRoutes.createFile, {
        userId: user._id,
        projectId: currProject,
        name: name,
        transcript: transcript,
      });
      console.log(response.data.data);
      if (response.data.success) {
        getFiles();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getFiles = async () => {
    try {
      const response = await axiosInstance.post(apiRoutes.getFiles, {
        projectId: currProject,
      });
      setFiles(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="text-center">
      <div onClick={openModal}>{children}</div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex items-center justify-start gap-3 mb-2">
          <div>
            <img className="w-12" src={youtubeIcon} alt="youtube icon" />
          </div>
          <div className="text-[#3C3C3C] font-bold text-xl">
            Upload from Youtube
          </div>
        </div>
        <Formik
          initialValues={{
            projectName: "",
          }}
          validationSchema={fileSchema}
          onSubmit={(values, { resetForm }) => {
            handleCreateFile(values);
            resetForm();
            closeModal();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="text-start mb-2 space-y-2">
                <label htmlFor="name" className="font-medium mb-1">
                  Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className="w-full border border-gray-300 py-2 px-3 rounded-md"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="text-start mb-2 space-y-2">
                <label htmlFor="transcript" className="font-medium mb-1">
                  Transcript
                </label>
                <Field
                  name="transcript"
                  as="textarea"
                  rows="6"
                  type="text"
                  className="w-full border border-gray-300 py-2 px-3 rounded-md"
                />
                <ErrorMessage
                  name="transcript"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#211935] border border-[#211935] hover:bg-white hover:text-[#211935] text-white px-4 py-2 rounded-md duration-300"
                >
                  {isSubmitting ? "Uploading..." : "Upload"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};
