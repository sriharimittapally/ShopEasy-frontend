import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Divider, IconButton } from "@mui/material";
import { CartItemCard } from "../../../types/cartTypes";
import { useAppDispatch } from "../../../State/Store";
import { deleteCartItem, updateCartItem } from "../../../State/customer/cartSlice";

const CartItem = ({item}:{item:CartItemCard}) => {
  const dispatch = useAppDispatch();
  
  const handleUpdateQuantity = (value:number) =>()=> {
   dispatch(updateCartItem({jwt:localStorage.getItem("jwt"),
    cartItemId:item.id,
    cartItem:{quantity:item.quantity+value}
   }))
  };

  const handleDeleteCartItem=()=>{
    const cartItemId =  Number(item.id);
    const jwt = localStorage.getItem("jwt") || "";
    dispatch(deleteCartItem(({jwt, cartItemId  })));
  }  
  return (
    <div className="border border-gray-300 rounded-md relative">
      <div className="p-5 flex gap-3 ">
        <div className="">
          <img
            className="w-[90px] rounded-md"
            src={item.product.images[0]}
            alt=""
          />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-lg">{item.product.title}</h1>
          <p className="text-gray-600 font-medium  text-sm">
          {item.product.color}
          </p>
          <p className="text-gray-400 text-xs">
            {" "}
            <strong>Sold by:</strong> {item.product.seller?.businessDetails.businessName}
          </p>

          <p className="text-sm">7 Days replacement available</p>

          <p className="text-sm text-gray-500 ">
            <strong>Quantity:</strong> {item.quantity}
          </p>
        </div>
      
      </div>
      <Divider />
        <div className="flex justify-between items-center">
        <div className="px-5 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2 w-[140px] justify-between">
            <Button onClick={handleUpdateQuantity(-1)} disabled={item.quantity===1} >
              <Remove />
            </Button>
            <span>{item.quantity}</span>
            <Button onClick={handleUpdateQuantity(1)}>
              <Add />
            </Button>
          </div>
        </div>
        <div className="pr-5">
            <p className="text-gray-700 font-medium ">₹{item.sellingPrice}</p>
        </div>
        </div>
        <div className="absolute top-1 right-1">
            <IconButton color="primary">
                <Close  onClick={handleDeleteCartItem} />
            </IconButton>

        </div>
    </div>
  );
};

export default CartItem;
