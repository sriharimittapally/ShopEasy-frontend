import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { sendLoginSignupOtp, signup } from "../../../State/AuthSlice";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {

      const dispatch = useAppDispatch();
      const {auth} = useAppSelector(store=>store);
      const navigate = useNavigate();
      
      const formik = useFormik({
        initialValues: {
          email: "",
          otp: "",
          fullName:"",
        },
        onSubmit: (values) => {
          console.log("formData", values);
        dispatch(signup({signupRequest:values, navigate}));
        },
      });
    
      const handleSendOtp = () => {
         const role = "ROLE_CUSTOMER"
        dispatch(sendLoginSignupOtp({ email: formik.values.email, role }));
      };
  return (
    <div>
      <h1 className="text-center font-bold text-xl primary-color pb-8 ">
        SIGNUP
      </h1>
      

      <div className="flex flex-col gap-4">
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
          <div className="space-y-3">
           <div className="space-y-2">
           <p className="font-medium text-sm opacity-50">
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
             <TextField
          fullWidth
          name="fullName"
          placeholder="Full Name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />
          </div>
        )}
       {auth.otpSent ?
       ( <Button
        onClick={() => formik.handleSubmit()}
        fullWidth
        variant="contained"
        sx={{ py: "11px" }}
      >
        Signup
      </Button>):(
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

export default RegisterForm;
