import { useState } from "react";
import SellerAccountForm from "./SellerAccountForm";
import SellerLoginFrom from "./SellerLoginForm";
import { Button } from "@mui/material";

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(false);
  const handleShowPage = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="grid md:gap-10 grid-cols-3 min-h-screen">
      <section className="lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md">
        {isLogin ? <SellerLoginFrom /> : <SellerAccountForm />}
        <div className="mt-10 space-y-2 ">
         <h1 className="text-center text-sm font-medium">
           {isLogin?"Register as a Seller":"Already have an Account?"}
          </h1>
          <Button
            onClick={handleShowPage}
            fullWidth
            sx={{ py: "11px" }}
            variant="contained"
          >
            {isLogin ? "Get Started" : "Login"}
          </Button>
        </div>
      </section>
      <section className="hidden md:col-span-1 lg:col-span-2 md:flex justify-center items-center">
        <div className="lg:w-[70%] px-5 space-y-10 text-center mx-auto">
          {/* Heading Section */}
          <div className="space-y-2">
            <p className="text-4xl font-extrabold  bg-clip-text">
              Join the ShopEasy Revolution
            </p>
            <p className=" text-transparent text-lg bg-gradient-to-r from-[#277cec] to-[#35a0e8] bg-clip-text  font-medium">
              Boost your sales today
            </p>
          </div>

          {/* Image Section */}
          <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <img
              className="w-full h-72 object-cover rounded-2xl transform hover:scale-105 transition-transform duration-300"
              src="https://www.tendtoread.com/wp-content/uploads/2020/11/eCommerce-Seller-Keys-to-Business-Success.jpg"
              alt="E-commerce Business"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeSeller;
