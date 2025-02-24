import { useState } from "react";
import Login from "./Login";
import RegisterForm from "./RegisterForm";
import { Button } from "@mui/material";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex justify-center h-[90vh] py-6 items-center">
      <div className="max-w-md w-full h-[85vh] rounded-md shadow-xl">
        <img
          className="w-full a rounded-t-md"
          src="https://static.vecteezy.com/system/resources/previews/001/750/400/non_2x/online-shopping-and-e-commerce-banner-vector.jpg"
          alt=""
        />
        <div className="mt-8 px-10">
        {isLogin ? <Login /> : <RegisterForm />}
        <div className="flex justify-center items-center mt-5">
          <p>{isLogin?"Don't have an account?":"Have an account?"}
          <Button size="small" onClick={()=>setIsLogin(!isLogin)}>{isLogin?"Create Account":"login"}</Button>
          </p>

        </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
