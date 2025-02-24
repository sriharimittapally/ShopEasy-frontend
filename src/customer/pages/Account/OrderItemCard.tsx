import { ElectricBolt } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { Order, OrderItem } from "../../../types/orderTypes";
import { useNavigate } from "react-router-dom";

const OrderItemCard = ({item,order}:{item:OrderItem, order:Order}) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/account/orders/${order.id}/${item.id}`)} className="text-sm bg-white p-5 space-y-4 border rounded-md border-gray-300 cursor-pointer">
      <div className="flex items-center gap-5">
        <div>
          <Avatar sizes="small" sx={{ bgcolor: yellow[600] }}>
            <ElectricBolt />
          </Avatar>
        </div>
        <div>
          <h1 className="font-bold text-[#2b82e6]">PENDING</h1>
          <p>Arriving by {new Date(order.deliverDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        </div>
      </div>

      <div className="p-5 bg-blue-50 flex gap-3">
        <div>
          <img
            className="w-[70px]"
            src={item.product.images[0]}
            alt=""
          />
        </div>
        <div className="w-full space-y-2">
          <h1 className="font-bold">{item.product.seller?.businessDetails.businessName}</h1>
          <p className="text-gray-600">
           {item.product.title}
          </p>
          <p>
            <strong>size : </strong>{item.product.sizes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
