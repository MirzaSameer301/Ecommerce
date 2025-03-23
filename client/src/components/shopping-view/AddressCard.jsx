import React from "react";

const AddressCard = ({
  addressInfo,
  handleEditAddress,
  handleDeleteAddress,
  setSelectedAddress,
}) => {
  return (
    <div className="p-3 border rounded shadow m-2">
      <div
        onClick={() => setSelectedAddress(addressInfo)}
        className="flex flex-col text-sm font-medium gap-2"
      >
        <label>
          Address: <span className="font-normal">{addressInfo.address}</span>
        </label>
        <label>
          City: <span className="font-normal">{addressInfo.city}</span>
        </label>
        <label>
          Pincode: <span className="font-normal">{addressInfo.pincode}</span>
        </label>
        <label>
          Phone: <span className="font-normal">{addressInfo.phone}</span>
        </label>
        <label>
          Notes: <span className="font-normal">{addressInfo.notes}</span>
        </label>
      </div>
      <div className="flex items-center justify-between mt-2">
        <button
          onClick={() => handleEditAddress(addressInfo)}
          className="bg-black cursor-pointer text-white hover:opacity-80 font-semibold p-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteAddress(addressInfo)}
          className="bg-black cursor-pointer text-white hover:opacity-80 font-semibold p-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
