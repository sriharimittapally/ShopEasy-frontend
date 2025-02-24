import { Route, Routes } from "react-router-dom"
import SellerTable from "../admin/pages/Sellers/SellerTable"
import Coupon from "../admin/pages/Coupon/Coupon"
import AddNewCouponForm from "../admin/pages/Coupon/AddNewCouponForm"
import GridTable from "../admin/pages/Home/GridTable"
import ElectronicTable from "../admin/pages/Home/ElectronicTable"
import ShopByCategoryTable from "../admin/pages/Home/ShopByCategoryTable"
import Deal from "../admin/pages/Home/Deal"


const AdminRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<SellerTable/>}/>
            <Route path="/coupon" element={<Coupon/>}/>
            <Route path="/add-coupon" element={<AddNewCouponForm/>}/>
            <Route path="/home-grid" element={<GridTable/>}/>
            <Route path="/electonics-catgeory" element={<ElectronicTable/>}/>
            <Route path="/shop-by-category" element={<ShopByCategoryTable/>}/>
            <Route path="/deals" element={<Deal/>}/>
        </Routes>
    </div>
  )
}

export default AdminRoutes