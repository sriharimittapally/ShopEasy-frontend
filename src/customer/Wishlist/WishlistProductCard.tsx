import { Close } from "@mui/icons-material";
import { Product } from "../../types/ProductTypes";
import { useAppDispatch } from "../../State/Store";
import { AddProductToWishlist } from "../../State/customer/wishlistSlice";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const WishlistProductCard = ({ item }: { item: Product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleWishlist = () => {
    item.id && dispatch(AddProductToWishlist({ productId: item.id }));
  };

  return (
    <div
      className="w-60 relative cursor-pointer"
    >
      <div  onClick={() =>
        navigate(
          `/product-details/${item.category?.categoryId}/${item.title}/${item.id}`
        )
      } className="w-full">
        <img src={item.images[0]} className="object-top w-full" alt="" />
      </div>
      <div className="pt-3 space-y-1">
        <p>{item.title}</p>
        <div className="price flex items-center gap-3">
          <span className="font-semibold text-gray-800">
            ₹ {item.sellingPrice}
          </span>
          <span className="thin-line-through text-gray-400">
            ₹ {item.mrpPrice}
          </span>
          <span className="primary-color font-semibold">
            {item.discountPercent}%
          </span>
        </div>
      </div>
      <div className="absolute top-1 right-1">
        <button onClick={handleWishlist}>
          <Close
            className="cursor-pointer bg-white rounded-full p-1"
            sx={{ color: blue[400] }}
          />
        </button>
      </div>
    </div>
  );
};

export default WishlistProductCard;
