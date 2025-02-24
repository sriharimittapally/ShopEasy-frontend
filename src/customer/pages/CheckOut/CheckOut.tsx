import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import AddressCard from "./AddressCard";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { createOrder } from "../../../State/customer/orderSlice";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const paymentGatewayList = [
  {
    value: "RAZORPAY",
    image:
      "https://latestlogo.com/wp-content/uploads/2024/01/razorpay-logo.png",
    label: "",
  },
  {
    value: "STRIPE",
    image:
      "https://logos-world.net/wp-content/uploads/2021/03/Stripe-Logo-700x394.png",
    label: "",
  },
];

const CheckOut = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.user);
  const addresses = user?.addresses || [];
  const {cart}=useAppSelector(store=>store);


  const [paymentGateway, setPaymentGateway] = useState("STRIPE");
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  const handleAddressChange = (addressId: number) => {
    setSelectedAddress(addressId);
  };

  const handlePaymentChange = (e: any) => {
    setPaymentGateway(e.target.value);
  };

  const handleCheckout = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }

    dispatch(
      createOrder({
        address: addresses.find((addr:any) => addr.id === selectedAddress), // Selected address
        jwt: localStorage.getItem("jwt") || "",
        paymentGateway: paymentGateway,
      })
    );
  };
  return (
    <>
      <div className="pt-10 px-5  sm:px-10 md:px-44 lg:px-60 min-h-screen">
        <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">
          <div className="col-span-2 space-y-5">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold"> Select Delivery Address</h1>
              <Button variant="outlined" onClick={handleOpen}>
                Add new Address
              </Button>
            </div>
            <div className="text-xs font-medium space-y-5">
              <p>Saved Addresses</p>
              <div className="space-y-3">
                {addresses.map((address: any) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    selectedAddress={selectedAddress}
                    onSelect={handleAddressChange}
                  />
                ))}
              </div>
            </div>
            <div className="py-4 px-5 rounded-md border border-gray-300">
              <Button onClick={handleOpen} startIcon={<Add />}>
                Add new Address
              </Button>
            </div>
          </div>
          <div>
            <div className="">
              <div className="space-y-3 border border-gray-300 rounded-md">
                <h1 className="primary-color font-medium  p-2 text-center">
                  Choose Payment Gateway
                </h1>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  className="flex justify-between ml-7 px-0 py-2"
                  onChange={handlePaymentChange}
                  value={paymentGateway}
                >
                  {paymentGatewayList.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      className="border border-gray-300 w-[48%] pr-2 rounded-md flex items-center justify-center gap-2"
                      value={item.value}
                      control={<Radio />}
                      label={
                        <img
                          className="w-15  object-cover"
                          src={item.image}
                          alt={item.label}
                        />
                      }
                    />
                  ))}
                </RadioGroup>
              </div>
            </div>
            <div className="border border-gray-300 rounded-md ">
              <PricingCard item={cart.cart?.cartItems.map(item=>item)} />
              <div className="p-5">
                <Button
                  sx={{ py: "11px" }}
                  variant="contained"
                  fullWidth
                  onClick={handleCheckout} // Trigger order creation on checkout
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddressForm paymentGateway={paymentGateway} />
        </Box>
      </Modal>
    </>
  );
};

export default CheckOut;
