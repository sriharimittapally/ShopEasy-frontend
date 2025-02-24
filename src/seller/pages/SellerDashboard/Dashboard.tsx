import { useEffect } from "react";
import { useAppDispatch } from "../../../State/Store";
import { fetchSellerProfile } from "../../../State/seller/sellerSlice";


const Dashboard = () => {
  const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(fetchSellerProfile(localStorage.getItem("jwt") || ""));
    }, []);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard