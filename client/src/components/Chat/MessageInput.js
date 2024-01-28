import React,{useState,useEffect,useRef} from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';

const MessageInput = ({group,socket,userInfo,setImage,setMessages}) => {

   const [message,setMessage] = useState({
    message : "",
    fileType :'text',
    groupId: group.id,
    user :{
      name : ''
    },
    userId : ''
   })
   const [file,setFile] = useState('')
   const [preview,setPreview] = useState('')
  const inputRef = useRef(null)
   const token = JSON.parse(localStorage.getItem('token'))

   useEffect(() => {
    setMessage((prevMessage) => ({
      ...prevMessage,
      groupId: group.id,
      user :{
        name : userInfo.userName
      },
      userId : userInfo.userId
    }));
  }, [group,userInfo]);

   const handleChange = (e)=>{
    setMessage({
      ...message,
      message: e.target.value,
    });
   }
  const sendMessage = async  ()=>{
        console.log(file,message,preview)
      if(message.fileType === 'image' && file){
        const formData = new FormData()
        formData.append('image',file)
        try{
          const response = await  axios.post(`http://localhost:4000/saveImage?groupId=${group.id}`,formData,{
            headers :{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            }
           })
           setMessage({...message,fileType:'text'})
           response.data.data.user = {
            name : userInfo.userName
           }
           socket.emit('group-message',response.data.data,group.groupName)
           inputRef.current.value = null
           setFile('')
           setPreview('')
           console.log(file,message,preview)
        }
        catch(error){
           console.log(error)
        }
      }
      else{
    if (message.message.trim() === '') {
      toast.error("Please type the message", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        return;
    }
       try{
           socket.emit('group-message',message,group.groupName)
           const response = await  axios.post('http://localhost:4000/send-message',message,{
            headers :{
              'Authorization': `Bearer ${token}`
            }
           })
           setMessage({
            ...message,
            message: '',
          });
           
       }
       catch(error){
        toast.error("Failed to save message", {
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
  }

  const handleFileChange = () => {
    console.log(message,preview)
    const file = inputRef.current.files[0];
        if (file.type.startsWith('image/')) {
          setMessage({...message,fileType:'image'})
          setFile(file)
          const reader = new FileReader();
          reader.onloadend = () => {
          const imageData = reader.result;
          setPreview(imageData)
          console.log(file,message,preview)
          }
          reader.readAsDataURL(file);
        }
        else{
          toast.error("Please select image", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            return;
        }
       
  };

  return (
       <div className="w-3/5 h-4/6 gap-5 flex items-center justify-center">
         {preview && <img src={preview} alt="pics" className="w-28 h-16 rounded-md " />}
       <div className="w-full h-16 p-5 flex gap-2 justify-center items-center border border-solid bg-white border-1 rounded-xl">
      <textarea className=" rounded-xl text-xl  w-5/6 p-4 h-14 border-none focus:outline-none font-serif resize-none"  placeholder='Message' value={message.message} onChange={(e)=>handleChange(e)}/>
      <label htmlFor="fileInput">
      <MdAttachFile className="text-2xl m-4 text-black" />
      <input
        type="file"
        id="fileInput"
        name="file"
        className="hidden"
        ref={inputRef}
        accept="image/*"
        onChange={handleFileChange}
      />
    </label>
      </div>
      <button><BsFillSendFill className="text-4xl text-black" onClick={sendMessage} /></button>
      </div>
  )
}

export default MessageInput