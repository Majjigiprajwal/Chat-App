import React,{useState} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { IoIosChatbubbles } from "react-icons/io";

const Signup = () => {
   
  const navigate = useNavigate();

  const [user,setUser] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    phoneNumber:'',
    isPremium:false
  })

  const handleChange = (e)=>{
      setUser({
        ...user,
        [e.target.name]:e.target.value
      })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(user.name.trim()==="" || user.email.trim()==="" || user.password.trim()==="" || user.confirmPassword.trim()===""){
      toast.error('Fill all the details correctly', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        return
    }
    else if(user.phoneNumber.length !== 10){
      toast.error('Please enter valid phone  number', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        return
    }
    else if(user.password !== user.confirmPassword){
      toast.error('Passwords do not match', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        return
    }
    else if(user.password.length < 8){
      toast.error('Passwords should be alteast 8 characters', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        return 
    }
    try{
      let response = await axios.post('http://localhost:4000/register',user);
      if(response.status === 201){
        toast.success('Account created successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
         navigate("/")
      }
    }
    catch(error){
      if(error?.response?.status === 400){
        toast.error('Email already exists,Please try with different Email address',{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          return
      }  
      toast.error("Could not signup at the moment,please try after sometime",{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }  
        navigate('/');
  }
  return (
    <>
    <div className="bg-white flex min-h-full  flex-1 flex-col h-screen items-center justify-center  px-6 py-12 lg:px-8 border border-solid border-gray-400 p-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-4xl mb-5 flex justify-center items-center font-bold text-[#05386b]"><IoIosChatbubbles className="mr-4 text-5xl"/>Lets Chat</h1>
          <h2 className="text-center text-3xl mb-5 text-[#05386b] font-bold leading-9 tracking-tight mb:text-2xl">
            Sign up for an account
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 font-serif" onSubmit={(e)=>{handleSubmit(e)}}>

          <div>
              <label htmlFor="name" className="block  font-bold leading-6 text-[#05386b]">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1 px-1.5 text-black text-lg shadow-sm ring-1 ring-inset placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 mb:text-xl"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-bold leading-6 text-[#05386b]">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1 px-1.5 text-black text-lg shadow-sm ring-1 ring-inset placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 mb:text-xl"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-lg font-bold leading-6 text-[#05386b]">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phoneNumberl"
                  name="phoneNumber"
                  type="phoneNumber"
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  required
                  className="block w-full font-sans rounded-md border-0 py-1 px-1.5 text-black text-lg shadow-sm ring-1 ring-inset placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 mb:text-xl"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-lg font-bold leading-6 text-[#05386b]">
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1 px-1.5 text-black text-lg shadow-sm ring-1 ring-inset placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 mb:text-xl"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirmPassword" className="block text-lg font-bold leading-6 text-[#05386b]">
                  Confirm Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="Password"
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1 px-1.5 text-black text-lg shadow-sm ring-1 ring-inset placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 mb:text-xl"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#05386b] px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-10"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
