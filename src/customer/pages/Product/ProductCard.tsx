import { useEffect, useState } from "react";
import "./ProductCard.css";
import { Button } from "@mui/material";
import { Favorite, ModeComment } from "@mui/icons-material";
import { Product } from "../../../types/ProductTypes";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../State/Store";
import { AddProductToWishlist } from "../../../State/customer/wishlistSlice";

const ProductCard = ({item}:{item:Product}) => {
  const [currentImage, setCurrentimage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let interval: any;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentimage((prevImage) => (prevImage + 1) % item.images.length);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
      interval = null;
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleWishlist =(e:any)=>{
    e.stopPropagation()
    item.id && dispatch(AddProductToWishlist(Number(item.id)))
  }

  return (

      <>
        <div onClick={()=>navigate(`/product-details/${item.category?.categoryId}/${item.title}/${item.id}`)} className="group px-4 relative">
          <div
            className="card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {item.images.map((item, index) => (
              <img
                className="card-media object-top"
                src={item}
                style={{
                  transform: `translateX(${(index - currentImage) * 100}%)`,
                }}
                alt=""
              />
            ))}
            {isHovered && (
              <div className="indicator flex flex-col items-center space-y-2">
                <div className="flex gap-3">
                  <Button onClick={handleWishlist}  variant="contained" sx={{ background: "white" }}>
                    <Favorite sx={{ color: "#2b82e6" }} />
                  </Button>

                  <Button variant="contained" sx={{ background: "white" }}>
                    <ModeComment sx={{ color: "#2b82e6" }} />
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="details pt-3 space-y-1 group-hover-effect w-[250px] rounded-md">
            <div className="name">
              <h1>{item.seller?.businessDetails.businessName}</h1>
              <p>{item.title}</p>
            </div>
            <div className="price flex items-center gap-3">
              <span className="font-semibold text-gray-800">₹ {item.sellingPrice}</span>
              <span className="thin-line-through text-gray-400">₹ {item.mrpPrice}</span>
              <span className="primary-color font-semibold">{item.discountPercent}%</span>
            </div>
          </div>
        </div>
      </>
  
  );
};

export default ProductCard;
