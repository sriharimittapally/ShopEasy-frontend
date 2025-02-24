import { Dashboard, Inventory, ShoppingBag ,Add, AccountBalanceWallet, Receipt, Logout, AccountBox} from "@mui/icons-material"
import DrawerList from "../../../component/DrawerList";


const menu=[
    {
        name:"Dashboard",
        path:"/seller",
        icon:<Dashboard className="primary-color"/>,
        activeIcon:<Dashboard className="text-white"/>
    },
    {
        name:"Orders",
        path:"/seller/orders",
        icon:<ShoppingBag className="primary-color"/>,
        activeIcon:<ShoppingBag className="text-white"/>
    },
    {
        name:"Products",
        path:"/seller/products",
        icon:<Inventory className="primary-color"/>,
        activeIcon:<Inventory className="text-white"/>
    },
    {
        name:"Add Product",
        path:"/seller/add-product",
        icon:<Add className="primary-color"/>,
        activeIcon:<Add className="text-white"/>
    },{
        name:"Payment",
        path:"/seller/payment",
        icon:<AccountBalanceWallet className="primary-color"/>,
        activeIcon:<AccountBalanceWallet className="text-white"/>
    },{
        name:"Transactions",
        path:"/seller/transactions",
        icon:<Receipt className="primary-color"/>,
        activeIcon:<Receipt className="text-white"/>
    }
];


const menu2=[
    {
        name:"Account",
        path:"/seller/account",
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


const SellerDrawerList = ({toggleDrawer}:{toggleDrawer:any}) => {
  return (
   
        <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer}/>
   
  )
}

export default SellerDrawerList