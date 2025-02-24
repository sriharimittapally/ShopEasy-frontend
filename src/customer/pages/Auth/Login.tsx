import { Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { sendLoginSignupOtp, signin } from "../../../State/AuthSlice";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"

const loginSchema=Yup.object().shape({
   email: Yup.string().required("Email is required"),
   otp: Yup.string().required("OTP is required")
})

const Login = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema:loginSchema,
    onSubmit: (values) => {
      console.log("formData", values);
      dispatch(signin({loginRequest:values, navigate}));
    },
  });

  const handleSendOtp = () => {
    if (!formik.values.email) {
      formik.setTouched({ email: true });
      formik.setFieldError("email", "Enter your email");
      return;
    }
    const role = "ROLE_CUSTOMER"
    dispatch(sendLoginSignupOtp({ email: formik.values.email, role:role }));
  };
  return (
    <div className="">
      <h1 className="text-center font-bold text-xl primary-color pb-6 ">
        LOGIN
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
              disabled={!formik.values.email || Boolean(formik.errors.email)}
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

export default Login;
