import { FaAccusoft, FaList, FaListAlt, FaMonero, FaProductHunt, FaShoppingCart, MdListAlt, MdOutlineCategory, MdOutlineDashboardCustomize, MdOutlineLocalOffer, MdOutlineSupervisedUserCircle, MdReceiptLong } from "react-icons/md";
import DiscountComponent from "../Discount/Discount";

export const nav_data = [
    {
        id: 0,
        icon: <MdOutlineDashboardCustomize size={'25px'}/>,
        text: "Dashboard",
        link: "/dashboard"
    },
    {
        id: 2,
        icon: <MdOutlineSupervisedUserCircle size={'22px'} />,
        text: "User",
        link: "/user"
    },
    {
        id: 3,
        icon: <MdListAlt size={'22px'} />,
        text: "Purchasing",
        link: "/purchasing"
    },
    {
        id: 4,
        icon: <MdOutlineCategory size={'22px'} />,
        text: "Product Category",
        link: "/product_category"
    },
    {
        id: 5,
        icon: <MdOutlineLocalOffer size={'22px'} />,
        text: "Product Discount",
        link: "/pdiscount"
    },
    {
        id: 6,
        icon: <MdReceiptLong size={'22px'} />,
        text: "Product Report",
        link: "/pdeport"
    }
]