import { BsCheck2Square } from "react-icons/bs";
import { BsFillDiagram3Fill } from "react-icons/bs";
import { BsFileEarmarkDiff } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";
export const Navideta = [
  {
    title: "Purchasing",
    icon: <BsCheck2Square />,
    link: "/",
  },

  {
    title: "Product Category",
    icon: <BsFillDiagram3Fill />,
    link: "./category",
  },

  {
    title: "Add & Remove",
    icon: <BsFileEarmarkDiff />,
    link: "./addorremove",
  },

  {
    title: "Report",
    icon: <TbReportSearch />,
    link: "",
  },
];
