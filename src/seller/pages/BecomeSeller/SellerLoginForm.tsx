import { Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { sendLoginSignupOtp } from "../../../State/AuthSlice";
import { sellerLogin } from "../../../State/seller/sellerAuthSlice";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";


const sellerLoginForm = Yup.object().shape({
   email: Yup.string().required("Email is required"),
    otp: Yup.string().required("OTP required"),
})

const SellerLoginForm = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema:sellerLoginForm,
    onSubmit: (values) => {
      console.log("formData", values);
      dispatch(sellerLogin({ loginRequest: values, navigate }));
    },
  });
  const handleSendOtp = () => {
    if (!formik.values.email) {
      formik.setTouched({ email: true });
      formik.setFieldError("email", "Enter your email");
      return;
    }
    const role = "ROLE_SELLER";
    dispatch(sendLoginSignupOtp({ email: formik.values.email , role:role }));
  };


  return (
    <div className="">
      <h1 className="text-center font-bold text-xl primary-color pb-5">
        Login as Seller
      </h1>
      <div className="flex flex-col gap-9">
        <TextField
          fullWidth
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        
        />
        {auth.otpSent && (
          <div className="space-y-2">
            <p className="font-medium text-sm opacity-30">
              Enter OTP sent to your email
            </p>
            <TextField
              fullWidth
              name="otp"
              placeholder="OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
          
            />
          </div>
        )}
        {auth.otpSent ? (
          <Button
            onClick={() => formik.handleSubmit()}
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
            Login
          </Button>
        ) : (
          <Button
            onClick={handleSendOtp}
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
           {auth.loading ? (
                         <CircularProgress sx={{ color: "white" }} />
                       ) : (
                         "send otp"
                       )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SellerLoginForm;
