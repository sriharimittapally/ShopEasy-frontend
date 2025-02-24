import { Close, LocalOffer, ShoppingCart, ShoppingCartOutlined } from "@mui/icons-material";
import CartItem from "./CartItem";
import { blue } from "@mui/material/colors";
import { Button, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PricingCard from "./PricingCard";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  deleteCartItem,
  fetchUserCart,
} from "../../../State/customer/cartSlice";
import { boolean } from "yup";

const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((store) => store);

  const handleCouponChange = (e: any) => {
    setCouponCode(e.target.value);
  
  };

  const handleApplyCoupon = () => {
    if(couponCode.trim()){
      setAppliedCoupon(couponCode);
    }
  }

  const handelRemoveCoupon = ()=>{
    setAppliedCoupon("");
    setCouponCode("")
  }


  useEffect(() => {
    dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
  }, []);

  return (
   <> 
   {cart.cart?.cartItems?.length && cart.cart?.cartItems?.length >= 1 ? (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="cartItemSection lg:col-span-2 space-y-3">
          {cart.cart?.cartItems.map((item: any) => (
            <CartItem item={item} />
          ))}
        </div>
        
          <div className="col-span-1 text-sm space-y-3">
            <div>
              <div className="border border-gray-300 rounded-md px-5 py-3  space-y-5">
                <div className="flex gap-3 text-sm items-center">
                  <div className="flex gap-3 text-sm items-center">
                    <LocalOffer sx={{ color: blue[500], fontSize: "17px" }} />
                  </div>
                  <span>Apply Coupons</span>
                </div>

                {!appliedCoupon ? (
                  <div className="flex justify-between items-center">
                    <TextField
                      onChange={handleCouponChange}
                      id="outlined-basic"
                      size="small"
                      placeholder="Coupon code"
                      variant="outlined"
                      value={couponCode}
                    />
                    <Button onClick={handleApplyCoupon} size="small">
                      Apply
                    </Button>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="p-1  pl-5 pr-3 border border-gray-300 rounded-md flex gap-2 items-center">
                      <span className="">{couponCode}</span>
                      <IconButton
                        onClick={handelRemoveCoupon}
                        size="small"
                      >
                        <Close className="text-red-600" />
                      </IconButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="border border-gray-300 rounded-md">
            
                <PricingCard item={cart.cart.cartItems} />
              
              <div className="p-5">
                <Button
                  onClick={() => navigate("/checkout")}
                  sx={{ py: "11px" }}
                  variant="contained"
                  fullWidth
                >
                  Buy now
                </Button>
              </div>
            </div>
          </div>
      </div>
    </div>):
    (<div className="flex h-screen flex-col w-full items-center justify-center m-auto">
     <ShoppingCartOutlined sx={{fontSize:"15rem"}} />
      <h1 className="font-bold text-center text-3xl"> Your cart is empty</h1>

    </div>)
    }
</>
  );
};

export default Cart;
