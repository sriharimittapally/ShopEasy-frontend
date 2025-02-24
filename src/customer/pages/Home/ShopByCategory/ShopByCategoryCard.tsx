import { HomeCategory } from "../../../../types/homeCategoryTypes";
import "./ShopByCategory.css";

const ShopByCategoryCard = ({item}:{item:HomeCategory}) => {

  return (
    <div className="flex flex-col items-center gap-3 group cursor-pointer">
    <div className="w-[150px] h-[150px] lg:w-[230px] lg:h-[230px] rounded-full p-[3px] bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="w-full h-full rounded-full overflow-hidden bg-white">
        <img
          className="w-full h-full object-cover object-top rounded-full  transition-transform duration-500 ease-out group-hover:scale-105"
          src={item.image}
          alt={item.name}
        />
      </div>
    </div>
    <h1 className="text-sm lg:text-lg font-medium text-gray-700 text-center group-hover:text-gray-900">
      {item.name}
    </h1>
  </div>
  );
};

export default ShopByCategoryCard;
