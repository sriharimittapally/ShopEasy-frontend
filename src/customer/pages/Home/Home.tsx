import ElectricCategory from "./ElectricCategory/ElectricCategory";
import CategoryGrid from "./CategoryGrid/CategoryGrid";
import Deal from "./Deal/Deal";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import { Button } from "@mui/material";
import {  Storefront } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const Home = () => {
   const navigate  = useNavigate();
  return (
    <>
      <div className="space-y-5 lg:space-y-10 px-8 relative pb-20">
        <ElectricCategory />
        <CategoryGrid />
        <div className="pt-20">
          <h1 className="text-lg lg:text-4xl font-bold primary-color pb-5 lg:pb-10 text-center">
            NEW DEALS
          </h1>
          <Deal />
        </div>
        <section className="pt-20 bg-gray-50">
      <h1 className="text-xl primary-color lg:text-4xl font-bold text-gray-800 pb-5 lg:pb-10 text-center">
        SHOP BY CATEGORY
      </h1>
      <ShopByCategory  />
    </section>
  <section className="relative h-[250px] lg:h-[300px] flex items-center justify-center px-6 lg:px-20 bg-gray-100 rounded-lg shadow-md overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-[#84baf7] to-[#4e94ef] opacity-90"></div>

  <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left text-white space-y-4 w-full max-w-2xl px-6 lg:px-0">
    <h1 className="text-4xl lg:text-5xl font-bold drop-shadow-md">
      Start Selling <span className="text-yellow-300">with Ease</span>
    </h1>

    <p className="text-lg lg:text-xl font-medium text-gray-200">
      Join <span className="font-bold text-yellow-300">ShopEasy</span> and grow your business effortlessly.
    </p>

    <div className="pt-4">
      <Button onClick={()=>navigate("/become-seller")}
        startIcon={<Storefront />}
        variant="contained"
        size="large"
        className="bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-300 ease-in-out"
      >
        Become a Seller
      </Button>
    </div>
  </div>

 
</section>




      </div>
    </>
  );
};

export default Home;
