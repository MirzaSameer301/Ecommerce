import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/shopAddressSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { addressFormControls } from "./config";
import AddressCard from "./AddressCard";

const initialData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};
const ShoppingAddress = ({selectedAddress,setSelectedAddress}) => {
  const [formData, setFormData] = useState(initialData);
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const [addressEditId, setAddressEditId] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addressList.length >= 3 && addressEditId === null) {
      setFormData(initialData);
      toast("You can add 3 addresses Max", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });

      return;
    }

    if (!addressEditId) {
      dispatch(
        addNewAddress({
          ...formData,
          userId: user.id,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user.id));
          setFormData(initialData);
          toast("Address Added Successfully");
        }
      });
    } else {
      dispatch(
        editAddress({
          userId: user.id,
          addressId: addressEditId,
          formData,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user.id));
          setAddressEditId(null);
          setFormData(initialData);
          toast("Address Updated successfully");
        }
      });
    }
  };
  useEffect(() => {
    dispatch(fetchAllAddresses(user.id));
  }, [dispatch]);
  const handleDeleteAddress = (getCurrentAddress) => {
    dispatch(
      deleteAddress({ userId: user.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user.id));
        toast("Address deleted successfully");
      }
    });
  };
  const handleEditAddress = (getCurrentAddress) => {
    setAddressEditId(getCurrentAddress._id);
    setFormData({
      ...formData,
      address: getCurrentAddress.address,
      city: getCurrentAddress.city,
      pincode: getCurrentAddress.pincode,
      phone: getCurrentAddress.phone,
      notes: getCurrentAddress.notes,
    });
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {addressList.map((addressInfo) => (
          <AddressCard
            key={addressInfo._id}
            addressInfo={addressInfo}
            handleEditAddress={handleEditAddress}
            handleDeleteAddress={handleDeleteAddress}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-4 mx-auto space-y-4 bg-white shadow rounded"
      >
        <h2 className="text-2xl font-bold text-center">
          {addressEditId ? "Edit Address" : "Add New Address"}
        </h2>
        {addressFormControls.map((control) => (
          <div key={control.name} className="flex flex-col">
            <label
              htmlFor={control.name}
              className="mb-2 font-semibold text-black"
            >
              {control.label}
            </label>
            {control.componentType === "input" ? (
              <input
                id={control.name}
                name={control.name}
                type={control.type}
                placeholder={control.placeholder}
                value={formData[control.name]}
                onChange={handleChange}
                className="border rounded p-2"
              />
            ) : (
              <textarea
                id={control.name}
                name={control.name}
                placeholder={control.placeholder}
                value={formData[control.name]}
                onChange={handleChange}
                className="border rounded p-2"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:opacity-80"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ShoppingAddress;
