// Admin Sidebar icons.
import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { IoMdStarOutline } from "react-icons/io";
import { MdOutlinePermMedia } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from "@/routes/adminPanelRoutes"
 

export const AdminSideBarMenu={
    dashboard:{title:"Dashboard",icon:<AiOutlineDashboard/>,url: ADMIN_DASHBOARD},
    categories:{title:"Categories",icon:<BiCategory/>, url:"#",
        submenu:[
            {title:"All Categories",url:"/admin/categories"},
            {title:"Add Category",url:"/admin/categories/add"}
        ]
    },
    products:{
        title:"Products",
        icon:<IoShirtOutline/>,
        url:"#",
        submenu:[
            {title:"All Products",url:"/admin/products"},
            {title:"Add Variant",url:"/admin/products/varient"},
            {
                title:"Add Product", url:"/admin/products/add"
            },
            {
                title:"Products Variant", url:"/admin/products/import"
            }
        ]
    },
    coupons:{title:"Coupons",icon:<RiCoupon2Line/>,url:"#",
        submenu:[
             {
                title:"Add Coupons", url:"/#"
            },
            {
                title:"All Coupons", url:"#"
            }
        ]
    },
    orders:{title:"Orders",icon:<MdOutlineShoppingBag/>,url:"#"},
    customers:{title:"Customers",icon:<LuUserRound/>,url:"#"},
    reviews:{title:"Reviews",icon:<IoMdStarOutline/>,url:"#"},
    media:{title:"Media",icon:<MdOutlinePermMedia/>, url: ADMIN_MEDIA_SHOW,},
}