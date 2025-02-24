import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../../../types/ProductTypes";
import { useSearchParam } from "react-use";

const SimilarProductCard = ({item}:{item:Product}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate(`/product-details/${item.category?.categoryId}/${item.title}/${item.id}`);
    
  };
  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <div className="group relativebg-white border border-gray-200 shadow-md  overflow-hidden transition-all duration-300 hover:shadow-lg">
        {/* Image Section */}
        <div className="w-full flex justify-center">
          <img
            className="w-full h-[230px] object-cover object-top"
            src={item.images[0]}
            alt="Product"
          />
        </div>

        {/* Details Section */}
        <div className="details pt-3 pb-4 px-3 space-y-2 text-center">
          <div className="name">
            <h1 className="text-lg font-semibold text-gray-800">{item.title}</h1>
            <p className="text-sm text-gray-500">{item.category?.categoryId}</p>
          </div>

          {/* Price Section */}
          <div className="price flex justify-center items-center gap-3">
            <span className="font-semibold text-gray-800 text-lg">₹ {item.sellingPrice}/-</span>
            <span className="line-through text-gray-400 text-sm">₹ {item.mrpPrice}</span>
            <span className="text-green-600 font-semibold text-sm">{item.discountPercent}% OFF</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilarProductCard;
