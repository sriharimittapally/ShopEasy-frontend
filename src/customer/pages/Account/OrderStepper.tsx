import { CheckCircle, FiberManualRecord } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const steps = [
  { name: "Order Placed", description: " on Thu, 11 Jan", value: "PLACED" },
  {
    name: "Packed",
    description: " Item Packed in Dispatch Warehouse",
    value: "CONFIRMED",
  },
  { name: "Shipped", description: " on Sun, 14 Jan", value: "SHIPPED" },
  { name: "Arriving", description: " by 15 Jan - 17 Jan", value: "ARRIVING" },
  { name: "Arrived", description: " by 17 - 18 Jan", value: "DELIVERED" },
  // {name : "Canceled", description :" on Thu, 11 Jan", value : "CANCELLED"},
];

const canceledStep = [
  { name: "Order Placed", description: " on Thu, 11 Jan", value: "PLACED" },
  {
    name: "Order Canceled",
    description: " on Thu, 11 Jan",
    value: "CANCELLED",
  },
];

const currentStep = 2;

const OrderStepper = ({ orderStatus }: any) => {
  const [statusStep, setStatusStep] = useState(steps);
  useEffect(() => {
    if (orderStatus === "CANCELLED") {
      setStatusStep(canceledStep);
    } else {
      setStatusStep(steps);
    }
  }, [orderStatus]);

  return (
    <Box className="my-10">
      {statusStep.map((step, index) => (
        <>
          <div key={index} className={`flex px-4`}>
            <div className="flex flex-col items-center">
              <Box
                sx={{ zIndex: -1 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  index <= currentStep
                    ? "bg-gray-200 text-teal-500"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {step.value === orderStatus ? (
                  <CheckCircle />
                ) : (
                  <FiberManualRecord sx={{ zIndex: -1 }} />
                )}
              </Box>
              {index < statusStep.length - 1 && (
                <div
                  className={`border border-gray-300 h-20 w-[3px] ${
                    index < currentStep
                      ? "bg-teal-500"
                      : "bg-gray-300 text-gray-600"
                  }`}
                ></div>
              )}
            </div>
            <div className={`ml-2 w-full`}>
              <div
                className={`${
                  step.value === orderStatus
                    ? "bg-teal-500  p-2 text-white font-medium rounded-md -translate-y-3"
                    : ""
                } ${
                  orderStatus === "CANCELLED" && step.value === orderStatus
                    ? "bg-red-500"
                    : ""
                }w-full`}
              >
                <p
                  className={` 
                    `}
                >
                  {step.name}
                </p>
                <p
                  className={`${
                    step.value === orderStatus
                      ? "text-gray-200"
                      : "text-gray-500"
                  }text-xs`}
                >{step.description}</p>
              </div>
            </div>
          </div>
        </>
      ))}
    </Box>
  );
};

export default OrderStepper;
