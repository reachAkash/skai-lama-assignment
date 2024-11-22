import { IoMdAdd } from "react-icons/io";
import uploadImage1 from "../assets/images/innerImg1.svg";
import uploadImage2 from "../assets/images/innerImg2.svg";
import uploadImage3 from "../assets/images/innerImg3.svg";
import { MdModeEditOutline } from "react-icons/md";
import { IoCopySharp } from "react-icons/io5";
import { BsXDiamondFill } from "react-icons/bs";

export const uploadPodcastCardDetails = [
  {
    title: "RSS Feed",
    desc: "lorem ipsum dolor amet. Dolor lorem sit",
    img: uploadImage1,
  },
  {
    title: "RSS Feed",
    desc: "lorem ipsum dolor amet. Dolor lorem sit",
    img: uploadImage2,
  },
  {
    title: "RSS Feed",
    desc: "lorem ipsum dolor amet. Dolor lorem sit",
    img: uploadImage3,
  },
];

export const filesData = [
  {
    no: 1,
    name: "Project Alpha",
    uploadDateTime: "2024-11-19 10:00 AM",
    action: "View",
  },
  {
    no: 2,
    name: "Project Beta",
    uploadDateTime: "2024-11-19 02:30 PM",
    action: "Edit",
  },
  {
    no: 3,
    name: "Project Gamma",
    uploadDateTime: "2024-11-19 05:45 PM",
    action: "Delete",
  },
];

export const sidebarData = [
  { icon: IoMdAdd, text: "Add your podcast", comingSoon: false },
  { icon: MdModeEditOutline, text: "Create & Repurpose", comingSoon: true },
  { icon: IoCopySharp, text: "Podcast Cloner", comingSoon: true },
  { icon: BsXDiamondFill, text: "Podcast Widget", comingSoon: true },
];
