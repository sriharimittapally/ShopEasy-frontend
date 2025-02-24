import { Button, Step, StepLabel, Stepper, Modal, Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../State/Store";
import { createSeller } from "../../../State/seller/sellerSlice";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useAppDispatch();

  const handleStep = (value: number) => () => {
    if (activeStep < steps.length - 1 || (activeStep > 0 && value === -1)) {
      setActiveStep(activeStep + value);
    }
    if (activeStep === steps.length - 1 && value === 1) {
      handleCreateAccount();
    }
  };

  const handleCreateAccount = async () => {
    console.log(formik.values);
    
    setLoading(true);
    setOpenModal(true);
  
    try {
      const response = await dispatch(createSeller(formik.values)).unwrap();
  
      if (response) {
        console.log("Seller created successfully:", response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating seller:", error);
     
    }
  };
  

  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      GSTIN: "",
      pickupAddress: {
        name: "",
        mobile: "",
        pinCode: "",
        address: "",
        locality: "",
        city: "",
        state: "",
      },
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        logo: "",
        banner: "",
        businessAddress: "",
      },
      password: "",
    },
    onSubmit: (values) => {
      console.log(values, "formik submitted");
    },
  });

  return (
    <div>
      {/* Stepper Component */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <section className="mt-10 space-y-9">
        <div>
          {activeStep === 0 ? (
            <BecomeSellerFormStep1 formik={formik} />
          ) : activeStep === 1 ? (
            <BecomeSellerFormStep2 formik={formik} />
          ) : activeStep === 2 ? (
            <BecomeSellerFormStep3 formik={formik} />
          ) : (
            <BecomeSellerFormStep4 formik={formik} />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button onClick={handleStep(-1)} variant="contained" disabled={activeStep === 0}>
            Back
          </Button>
          <Button onClick={handleStep(1)} variant="contained">
            {activeStep === steps.length - 1 ? "Create Account" : "Continue"}
          </Button>
        </div>
      </section>

      {/* Success Modal with Blur Effect & Loading */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
  <Box
    className="fixed inset-0 flex items-center justify-center bg-opacity-40 backdrop-blur-lg"
    sx={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(0,0,0,0.5)" }} // Ensures full blur
  >
    {loading ? (
      // Show only the loader in the center with full blur
      <div className="flex items-center justify-center">
        <CircularProgress size={60} thickness={5} />
      </div>
    ) : (
      // After success, show the card with blur effect
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96 bg-opacity-80 backdrop-blur-md">
        <h2 className="text-xl font-semibold text-blue-600">
          ✅ Verification Link Sent to Your Email!
        </h2>
        <p className="mt-3 text-gray-600">
          Please check your email to verify your account before proceeding.
        </p>
      </div>
    )}
  </Box>
</Modal>

    </div>
  );
};

export default SellerAccountForm;
