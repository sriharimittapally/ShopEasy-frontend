import { Divider } from "@mui/material";
import { useAppSelector } from "../../../State/Store";
import { CartItemCard } from "../../../types/cartTypes";

const PricingCard = ({ item }: { item: CartItemCard[]}) => {
  console.log(item);
  
  const { cart } = useAppSelector((state) => state.cart); // Ensure correct selector
  console.log(cart); 
  
  // Debugging to check cart structure
  const discountAmount =
    cart && cart.discount && cart.totalMrpPrice
      ? (cart.totalMrpPrice * cart.discount) / 100
      : 0;

  const shippingCharges =
    cart && cart.cartItems && cart.cartItems.length >= 1 ? 90 : 0;

    

  return (
    <>
 
          <div className="space-y-3 p-5">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-600">₹{cart?.totalMrpPrice}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Discount</span>
          <span className="text-gray-600">₹{discountAmount}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Shipping Charges</span>
          <span className="text-gray-600">₹{shippingCharges}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Platform Fee</span>
          <span className="text-blue-400">Free</span>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between items-center p-5">
        <span className="text-gray-800">
          <strong>Total</strong>
        </span>
        <span className="text-blue-400 font-semibold">
          ₹{cart ? cart.totalSellingPrice : 0}
        </span>
      </div>
    
    </>
  );
};

export default PricingCard;
