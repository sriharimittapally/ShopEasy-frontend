import { AccountBox, Add, Category, Dashboard, ElectricBolt, Home, IntegrationInstructions, LocalOffer, Logout } from "@mui/icons-material";
import DrawerList from "../../component/DrawerList"


const menu=[
    {
        name:"Dasboard",
        path:"/admin",
        icon:<Dashboard className="primary-color"/>,
        activeIcon:<Dashboard className="text-white"/>
    },
    {
        name:"Coupons",
        path:"/admin/coupon",
        icon:<IntegrationInstructions className="primary-color"/>,
        activeIcon:<IntegrationInstructions className="text-white"/>
    },
    {
        name:"Add New Coupon",
        path:"/admin/add-coupon",
        icon:<Add className="primary-color"/>,
        activeIcon:<Add className="text-white"/>
    },
    {
        name:"Home",
        path:"/admin/home-grid",
        icon:<Home className="primary-color"/>,
        activeIcon:<Home className="text-white"/>
    },
    {
        name:"Electronic Category",
        path:"/admin/electonics-catgeory",
        icon:<ElectricBolt className="primary-color"/>,
        activeIcon:<ElectricBolt className="text-white"/>
    },{
        name:"Shop By Category",
        path:"/admin/shop-by-category",
        icon:<Category className="primary-color"/>,
        activeIcon:<Category className="text-white"/>
    },{
        name:"Deals",
        path:"/admin/deals",
        icon:<LocalOffer className="primary-color"/>,
        activeIcon:<LocalOffer className="text-white"/>
    }
];


const menu2=[
    {
        name:"Account",
        path:"/admin/account",
        icon:<AccountBox className="primary-color"/>,
        activeIcon:<AccountBox className="text-white"/>
    },
    {
        name:"Logout",
        path:"/",
        icon:<Logout className="primary-color"/>,
        activeIcon:<Logout className="text-white"/>
    }
]

const AdminDrawerList = ({toggleDrawer}:any) => {
  return (
    <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer}/>
  )
}

export default AdminDrawerList