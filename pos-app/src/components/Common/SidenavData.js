import { BsHouse } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";
import { TbGift } from "react-icons/tb";
import { TbShoppingCart } from "react-icons/tb";
export const Navideta = [
  {
    title: "Dashboard",
    icon: <BsHouse />,
    link: "/",
  },

  {
    title: "Users",
    icon: <BsFillPeopleFill />,
    link: "./category",
  },

  {
    title: "Product Hand.",
    icon: <BsFillCalendarDateFill />,
    link: "./addorremove",
  },

  {
    title: "Salse & Refund",
    icon: <TbShoppingCart />,
    link: "",
  },
  {
    title: "Discount & Promo.",
    icon: <TbGift />,
    link: "",
  },
  {
    title: "Report",
    icon: <TbReportSearch />,
    link: "",
  },
];
