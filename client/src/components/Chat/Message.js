import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { parseJwt } from '../../util/jwtParser';

const Message = () => {

  const [messages,setMessages] = useState([])
  const [userInfo,setUserInfo] = useState({
    userId:'',
    userName:''
  })

  const localMessages = JSON.parse(localStorage.getItem('messages'))

  const lastMessageRef = useRef(null);

  const token = JSON.parse(localStorage.getItem('token'))

  const storeMessagesInLocalStorage = (data)=>{
        if(!localMessages){
           if(data.length>=10){
               const newMessages = data.slice(-10);
               localStorage.setItem('messages',JSON.stringify(newMessages))
           }
           else{
            localStorage.setItem('messages',JSON.stringify(data))
           }
        }
        else{
              if(data.length>=10){
                localStorage.setItem('messages',JSON.stringify(data.slice(-10)))
              }
              else{
        
                    if(localMessages.length === 10 ){
                      localMessages.splice(0,data.length)
                      const  newLocalMessages = localMessages.concat(data)
                      localStorage.setItem('messages',JSON.stringify(newLocalMessages))
                    }
                    else{
                      const noOfMessagesToBeStored = Number(10-Number(localMessages.length))
                      console.log(noOfMessagesToBeStored)
                      const newLocalMessages = localMessages.concat(data.slice(0,noOfMessagesToBeStored))
                      console.log(newLocalMessages)
                      localStorage.setItem('messages',JSON.stringify(newLocalMessages))
                    }
              }
        }
  }

        useEffect(()=>{

             const userData = parseJwt(token)
             setUserInfo({userId:userData.userId,userName:userData.userName})
  
          
          },[token])


        useEffect(()=>{

        const getMessages = async ()=>{
          let  lastMessageId =0;
          if(localMessages?.length>0){
            setMessages(localMessages)
           lastMessageId = localMessages[localMessages.length-1].id 
          }
             try{
              const {data : {data}} = await  axios.get(`http://localhost:4000/get-messages?lastMessageId=${lastMessageId}`,{
                headers :{
                  'Authorization': `Bearer ${token}`
                }
               })
               if(data.length > 0){
                setMessages((prevMessages)=>([...prevMessages,...data]))
                storeMessagesInLocalStorage(data)
               }
               console.log(data)
             }
             catch(error){
              console.log(error)
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

        },[])

      useEffect(()=>{

        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
        
      },[messages])
  
  return (
    
    <div className="m-4 p-4 flex flex-col gap-5 ">
      {
       messages.length > 0 && messages.map((message,index)=>{
          return(userInfo.userId === message.userId ?  <div key={message.id} className="w-full h-full flex flex-col items-end gap-5 p-1" ref={index === messages.length - 1 ? lastMessageRef : null}>
          <div className="max-w-3/6 bg-green-300 flex flex-col overflow-hidden whitespace-normal rounded-tr-xl rounded-tl-xl rounded-bl-xl font-serif ">
                <p className="text-sm font-semibold pl-2 pt-2 pr-2">{message.user.name}</p>
                <p className="pl-3 pr-3 pt-1 pb-1 text-lg ">{message.message}</p>
             </div>
            </div> : <div key={message.id} className="w-full h-full flex flex-col items-start gap-5 p-1 " ref={index === messages.length - 1 ? lastMessageRef : null} >
          <div className="max-w-3/6 bg-white  flex flex-col overflow-hidden whitespace-normal rounded-xl font-serif">
          <p className="text-sm font-semibold pl-2 pt-2">{message.user.name}</p>
          <p className="pl-3 pr-3 pt-1 pb-1 text-lg ">{message.message}</p>
          </div>
          </div> )
        })
      }
        </div>
  
      
  )
}

export default Message