import { ThemeProvider } from "@mui/material";
import Navbar from "./customer/components/Navbar/Navbar";
import customTheme from "./Theme/customTheme";
import Home from "./customer/pages/Home/Home";
import Product from "./customer/pages/Product/Product";
import ProductDetails from "./customer/pages/ProductDetails/ProdcutDetails";
import Review from "./customer/pages/Review/Review";
import Cart from "./customer/pages/Cart/Cart";
import CheckOut from "./customer/pages/CheckOut/CheckOut";
import Account from "./customer/pages/Account/Account";
import { Route, Routes } from "react-router-dom";
import BecomeSeller from "./seller/pages/BecomeSeller/BecomeSeller";
import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard";
import AdminDashboard from "./admin/pages/Dashboard/AdminDashboard";

import { useAppDispatch } from "./State/Store";

import Auth from "./customer/pages/Auth/Auth";
import { useEffect } from "react";
import PaymentSuccess from "./customer/pages/PaymentSuccess";
import Wishlist from "./customer/Wishlist/Wishlist";
import { createHomeCategories } from "./State/customer/customerSlice";
import { homeCategories } from "./data/HomeCategories";
import VerifySeller from "./seller/pages/BecomeSeller/VerfiySeller";

const App = () => {
  const dispatch = useAppDispatch();
  // const { seller, auth } = useAppSelector((store) => store);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(fetchSellerProfile(localStorage.getItem("jwt") || ""));
  // },[]);

  // useEffect(() => {
  //   if (seller.profile) {
  //     navigate("/seller");
  //   }
  // }, [seller.profile]);

  useEffect(() => {
    // dispatch(
    //   fetchUserProfile({ jwt: auth.jwt || localStorage.getItem("jwt") })
    // );
    dispatch(createHomeCategories(homeCategories));
  }, []);
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/products/:category" element={<Product />} />
            <Route path="/reviews/:productId" element={<Review />} />
            <Route
              path="/product-details/:categoryId/:name/:productId"
              element={<ProductDetails />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route
              path="/payment-success/:orderId"
              element={<PaymentSuccess />}
            />

            <Route path="/account/*" element={<Account />} />
            <Route path="/become-seller" element={<BecomeSeller />} />
            <Route path="/seller/*" element={<SellerDashboard />} />
            <Route path="/verify-seller/:otp" element={<VerifySeller />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
