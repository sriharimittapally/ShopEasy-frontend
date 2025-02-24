
import { Route, Routes } from "react-router-dom"
import Products from "../seller/pages/Products/Products"
import AddProduct from "../seller/pages/Products/AddProduct"
import Orders from "../seller/pages/Orders/Orders"
import Profile from "../seller/pages/Account/Profile"
import Payment from "../seller/pages/Payment/Payment"
import Transaction from "../seller/pages/Payment/Transactions"
import Dashboard from "../seller/pages/SellerDashboard/Dashboard"


const SellerRoutes = () => {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="products" element={<Products/>}/>
        <Route path="/add-product" element={<AddProduct/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/account" element={<Profile/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/transactions" element={<Transaction/>}/>
        </Routes>
    </div>
  )
}

export default SellerRoutes