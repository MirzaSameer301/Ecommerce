import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/authSlice";
import Toast from "../../components/Toast";
const initialState = {
  userName: "",
  email: "",
  password: "",
};
const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();
const handleSubmit=(e)=>{
  e.preventDefault();
  dispatch(registerUser(formData)).then((data)=>{
    if(data.payload.success){
      setMessage(data.payload.message)
      navigate('/auth/login')
      setOpenToast(true);
    }
    else{
      setMessage(data.payload.message)
      setOpenToast(true);
    }
  })
}
  return (
    <div className="flex flex-col p-4 gap-2 items-center justify-center mx-auto w-72 sm:w-96">
      <Toast message={message} openToast={openToast} setOpenToast={setOpenToast}/>
      <h1 className="text-2xl font-bold">Create New Account </h1>
      <Link to={"/auth/login"}>
        <p className=" cursor-pointer">
          Already have an account?{" "}
          <span className="font-semibold hover:opacity-80">Login</span>
        </p>
      </Link>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-2 w-full">
          <label className="p-2 font-semibold">User Name</label>
          <input
            className="p-2 bg-gray-100 outline-none"
            type="text"
            placeholder="Enter User Name"
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="p-2 font-semibold">Email</label>
          <input
            className="p-2 bg-gray-100 outline-none"
            type="text"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="p-2 font-semibold">Password</label>
          <input
            className="p-2 bg-gray-100 outline-none"
            type="password"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          className="w-full font-semibold text-xl bg-black text-white p-2 m-3 hover:opacity-80"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default AuthRegister;
