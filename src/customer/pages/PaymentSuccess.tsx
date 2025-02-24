import { Button } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../State/Store";
import { useEffect } from "react";
import { paymentSuccess } from "../../State/customer/orderSlice";
import { CheckCircle } from "@mui/icons-material";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { orderId } = useParams();
  const location = useLocation();
  const { width, height } = useWindowSize(); 

  const getQueryParam = (key: string) => {
    const query = new URLSearchParams(location.search);
    return query.get(key);
  };

  useEffect(() => {
    const paymentId = getQueryParam("razorpay_payment_id");
    const paymentLinkId = getQueryParam("razorpay_payment_link_id");

    dispatch(
      paymentSuccess({
        jwt: localStorage.getItem("jwt") || "",
        paymentId: paymentId || "",
        paymentLinkId: paymentLinkId || "",
      })
    );
  }, [orderId]);

  return (
    <div className="min-h-[90vh] flex justify-center items-center bg-gradient-to-r from-blue-500 via-teal-400 to-green-500">
      <Confetti width={width} height={height} numberOfPieces={400} recycle={false} /> 
      <div className="bg-white bg-opacity-90 backdrop-blur-lg p-8 w-[90%] lg:w-[30%] rounded-3xl shadow-2xl border border-gray-200 flex flex-col gap-6 items-center text-center">
        <CheckCircle className="text-green-500" sx={{ fontSize: "70px" }} />
        <h1 className="text-4xl font-bold text-gray-800">Payment Successful!</h1>
        <p className="text-lg text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
        <Button
          sx={{
            background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
            color: "white",
            fontSize: "16px",
            padding: "12px 24px",
            borderRadius: "12px",
            "&:hover": { background: "linear-gradient(135deg, #5A62E0 0%, #000CDE 100%)" },
          }}
          variant="contained"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
