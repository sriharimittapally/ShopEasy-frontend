import { Address } from "../../../types/userTypes"


const UserAddressCard = ({address}:{address:Address}) => {
  return (
    <div className="p-5 border border-gray-300 rounded-md flex">
    <div className="space-y-3">
      <h1>{address.name}</h1>
      <p className="w-[320px]">
        {address.address}, {address.locality}, {address.city} - {address.pinCode}
      </p>
      <p>
        <strong>Mobile:</strong> {address.mobile}
      </p>
    </div>
  </div>
  )
}

export default UserAddressCard