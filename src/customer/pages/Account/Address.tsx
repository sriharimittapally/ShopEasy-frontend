
import { useAppSelector } from "../../../State/Store";
import UserAddressCard from "./UserAddressCard";

const Address = () => {
  const user = useAppSelector((store) => store.auth.user);

  if (!user || !user.addresses) return <p>Loading...</p>;

  return (
    <div className="space-y-5">
      {user.addresses.length > 0 ? (
        user.addresses.map((address: any) => (
          <UserAddressCard key={address.id} address={address} />
        ))
      ) : (
        <p>No saved addresses.</p>
      )}
    </div>
  );
};

export default Address;
