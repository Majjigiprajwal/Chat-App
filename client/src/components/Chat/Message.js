import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const Message = () => {

  const [message,setMessage] = useState([])

  const token = JSON.parse(localStorage.getItem('token'))

  useEffect(()=>{

        const getMessages = async ()=>{
             try{
              const {data : {data}} = await  axios.get('http://localhost:4000/get-messages',{
                headers :{
                  'Authorization': `Bearer ${token}`
                }
               })
               console.log(data)
               setMessage(data)

             }
             catch(error){
              toast.error("Failed to fetch messages", {
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
        }
             getMessages()

             const intervalId = setInterval(getMessages, 1000);
             return () => clearInterval(intervalId);

  },[token])
  
  return (
    <>
    {
      message.map((message)=>{
        return     <div className="m-4 p-4 flex flex-col gap-5">
            <div className="w-full h-full flex flex-col items-end gap-5 ">
          <div className="max-w-2/5 bg-green-300 flex flex-col overflow-hidden whitespace-normal  p-4 rounded-tr-xl rounded-tl-xl rounded-bl-xl font-serif ">
                <p>prajwal</p>
                <p>{message.message}</p>
             </div>
            </div>
            </div>
           
      })
    }
    </>
//     <div className="m-4 p-4 flex flex-col gap-5">
//     <div className="w-full h-full flex flex-col items-end gap-5 ">
//       <div className="max-w-2/5 bg-green-300 flex flex-col overflow-hidden whitespace-normal  p-4 rounded-tr-xl rounded-tl-xl rounded-bl-xl font-serif ">
//         <p>name</p>
//         <p>hi</p>
//       </div>
//     </div>

// <div className="w-full h-full flex flex-col items-start gap-5 ">
// <div className="max-w-2/5 bg-white flex flex-col overflow-hidden whitespace-normal rounded-xl p-4 font-serif">
//   <p>name</p>
//   <p>just checkin</p>
// </div>
// </div>
// </div>
  )
}

export default Message