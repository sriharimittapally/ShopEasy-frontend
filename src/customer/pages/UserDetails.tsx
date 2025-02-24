import { Divider } from "@mui/material";
import ProfileFiledCard from "../../component/ProfileFiledCard";
import { useAppDispatch, useAppSelector } from "../../State/Store";

const UserDetails = () => {
  const {auth} = useAppSelector(store=>store);

  return (
    <div className="flex justify-center py-10">
      <div className="w-full lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Personal Details</h1>
        </div>
        <div className="">
          <ProfileFiledCard keys="Name" value={auth.user?.fullName || ""} />
          <Divider />
          <ProfileFiledCard
            keys="Email"
            value={auth.user?.email || ""}
          />
          <Divider />
          <ProfileFiledCard keys="Mobile" value={auth.user?.mobile || ""} />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;