import React from "react";

import { uploadPodcastCardDetails } from "../utils/constants";
import { useRecoilValue } from "recoil";
import { files } from "../recoil/atoms";
import FilesList from "../components/FilesList";
import { v4 as uuid } from "uuid";
import {
  UploadPodcastCard,
  UploadPodcastCard2,
} from "../components/ModalCards";

const ProjectPage = () => {
  const filesData = useRecoilValue(files);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-[#1D1929]">Add Podcast</h2>
      <div className="grid grid-cols-3 gap-8">
        {/* upload cards */}
        {uploadPodcastCardDetails?.map((item, idx) => {
          return <UploadPodcastCard key={uuid()} item={item} idx={idx} />;
        })}
      </div>
      {filesData.length > 0 ? (
        // logic to show files if available
        <FilesList filesData={filesData} />
      ) : (
        <UploadPodcastCard2 />
      )}
    </div>
  );
};

export default ProjectPage;
