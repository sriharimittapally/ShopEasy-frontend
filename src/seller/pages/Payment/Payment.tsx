import { Button, Card, Divider } from "@mui/material";
import TranscationTable from "./Transactions";

const Payment = () => {
  return (
    <div className="space-y-5">
      <Card className="rounded-md space-y-4 p-5">
        <h1 className="text-gray-600 font-medium">Total Earnings</h1>
        <h1 className="font-bold text-xl p-1">₹12873</h1>
        <Divider />
        <p className="text-gray-600 font-medium pt-1">
          Last Payment : <strong>₹0</strong>
        </p>
      </Card>
      <div className="pt-20 space-y-3">
      <Button sx={{mb:"15px"}} variant="contained">
        Transactions
      </Button>
      <TranscationTable/>
      </div>
      
    </div>
  );
};

export default Payment;
