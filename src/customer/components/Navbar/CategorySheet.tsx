import { Box } from "@mui/material";
import { menLevelThree } from "../../../data/category/level three/menLevelThree";
import { menLevelTwo } from "../../../data/category/level two/menLevelTwo";
import { womenLevelTwo } from "../../../data/category/level two/womenLevelTwo";
import { womenLevelThree } from "../../../data/category/level three/womenLevelThree";
import { useNavigate } from "react-router-dom";


export const categoryTwo:{[key:string]:any[]} = {
  men: menLevelTwo,
  women:womenLevelTwo
};

export const categoryThree:{[key:string]:any[]} = {
  men: menLevelThree,
  women:womenLevelThree
};

console.log(categoryThree);

const CategorySheet = ({selectedCategory}:any) => {
  const navigate = useNavigate();
  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter(
      (child: any) => child.parentCategoryId == parentCategoryId
    );
  };
  return (
    <Box
      sx={{ zIndex: 1 }}
      className="bg-white shadow-lg lg:h-[500px] overflow-y-auto"
    >
      <div className="flex text-sm flex:wrap">
        {categoryTwo[selectedCategory]?.map((item:any, index) => 
          <div
            className={`p-8 lg:w-[20%] ${
              index % 2 === 0 ? "bg-slate-100" : "bg-white"
            }`}
          >
            <p  className="primary-color mb-5 font-semibold">
              {item.name}
            </p>
            <ul className="space-y-3">
              {childCategory(categoryThree[selectedCategory], item.categoryId).map(
                (item: any, index:any) => (
                  <div>
                    <li key={index} onClick={()=>navigate("/products/"+item.categoryId)}
                      
                      className="hover:text-[#2b82e6] cursor-pointer"
                    >
                      {item.name}
                    </li>
                  </div>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </Box>
  );
};

export default CategorySheet;
