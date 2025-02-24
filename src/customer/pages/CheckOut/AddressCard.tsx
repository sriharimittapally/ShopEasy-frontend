import { Radio } from "@mui/material";
import { Address } from "../../../types/userTypes";

interface AddressCardProps {
  address: Address;
  selectedAddress: number | null;
  onSelect: (addressId: number) => void;
}

const AddressCard = ({ address, selectedAddress, onSelect }: AddressCardProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(Number(e.target.value));
  };

  return (
    <div className="p-5 border border-gray-300 rounded-md flex">
      <div>
        <Radio
          checked={selectedAddress === address.id}
          onChange={handleChange}
          value={address.id}
          name="radio-button"
        />
      </div>
      <div className="space-y-3 pt-3">
        <h1>{address.name}</h1>
        <p className="w-[320px]">
          {address.address}, {address.locality}, {address.city} - {address.pinCode}
        </p>
        <p>
          <strong>Mobile:</strong> {address.mobile}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
