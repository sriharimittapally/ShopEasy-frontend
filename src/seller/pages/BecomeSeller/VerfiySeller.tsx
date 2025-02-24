import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
//import { useAppSelector } from "../../../State/Store";

const VerifySeller = () => {
  const { otp } = useParams(); 
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();
  

  useEffect(() => {
    const verifyOtp = async () => {
      try {
        const response = await fetch(`http://localhost:5454/sellers/verify/${otp}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
         
        });

        const data = await response.json();
        if (response.ok) {
          setStatus("✅ Verification Successful! Please Login");
        
          setTimeout(() => navigate("/become-seller"), 2000); 
        
        } else {
          setStatus(data.message ||" Invalid or Expired OTP");
        }
      } catch (error) {
        setStatus(" Error verifying OTP. Please try again.");
      }
    };

    verifyOtp();
  }, [otp, navigate]);

  return (
    <div className="fixed h-screen bg-transparent inset-0 flex screen-h w-full items-center justify-center bg-opacity-40 backdrop-blur-lg">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
      <h2 className="text-xl font-semibold text-blue-600">{status}</h2>
    </div>
  </div>
  );
};

export default VerifySeller;
