import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import MessageInput from './MessageInput';

const Message = ({group,openJoinGroupModal,socket,userInfo}) => {

  const [messages,setMessages] = useState([])

  const localMessages = JSON.parse(localStorage.getItem(group.groupName))
   
  const lastMessageRef = useRef(null);
  
  const token = JSON.parse(localStorage.getItem('token'))

  const storeMessagesInLocalStorage = (data)=>{
        if(data.length >0){
        if(!localMessages){
           if(data.length>=10){
               const newMessages = data.slice(-10);
               localStorage.setItem(group.groupName,JSON.stringify(newMessages))
           }
           else{
            localStorage.setItem(group.groupName,JSON.stringify(data))
           }
        }
        else{
              if(data.length>=10){
                localStorage.setItem(group.groupName,JSON.stringify(data.slice(-10)))
              }
              else{
        
                    if(localMessages.length === 10 ){
                      localMessages.splice(0,data.length)
                      const  newLocalMessages = localMessages.concat(data)
                      localStorage.setItem(group.groupName,JSON.stringify(newLocalMessages))
                    }
                    else{
                      const noOfMessagesToBeStored = Number(10-Number(localMessages.length))
                      console.log(noOfMessagesToBeStored)
                      const newLocalMessages = localMessages.concat(data.slice(0,noOfMessagesToBeStored))
                      console.log(newLocalMessages)
                      localStorage.setItem(group.groupName,JSON.stringify(newLocalMessages))
                    }
              }
        }
      }
  }
  useEffect(() => {
    const handleIncomingMessage = (message) => {
         setMessages((prevMessage)=>([...prevMessage,message]))
    };

    socket.on('message', handleIncomingMessage);

    return () => {
      socket.off('message', handleIncomingMessage);
    };
  }, [socket]);

        useEffect(()=>{
    
        const getMessages = async ()=>{
          let  lastMessageId =0;
          if(localMessages?.length>0){
            setMessages(localMessages)
           lastMessageId = localMessages[localMessages.length-1].id 
          }
             try{
              console.log(group.id)
              const {data : {data}} = await  axios.get(`http://localhost:4000/get-messages?lastMessageId=${lastMessageId}&&groupId=${group.id}`,{
                headers :{
                  'Authorization': `Bearer ${token}`
                }
               })
               if(localMessages?.length >0){
                setMessages((prevMessages)=>([...localMessages,...data]))
               }
              else{
                   setMessages((prev)=>([...data]))
              }
                console.log(data)
                storeMessagesInLocalStorage(data)
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
           if(group){
            getMessages()
           }

           socket.emit('join-group',group)

        },[group,token])

      useEffect(()=>{

        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    
      },[messages])
  
  return (
    <div className="flex flex-col h-full ">
    <div className="w-full h-[80%] overflow-hidden overflow-y-auto pl-6 pr-6  ">
    <div className="m-4 p-4 flex flex-col gap-5">
      {
       group ? messages.length > 0 && messages.map((message,index)=>{
           if(message.fileType === 'text'){
            return(userInfo.userId === message.userId ?  <div key={message.id} className="w-full h-full flex flex-col text-white items-end gap-5 p-1" ref={index === messages.length - 1 ? lastMessageRef : null}>
            <div className="max-w-3/6 bg-black flex flex-col overflow-hidden whitespace-normal rounded-tr-xl rounded-tl-xl rounded-bl-xl font-serif ">
                  <p className="text-sm font-semibold pl-2 pt-2 pr-2">{message.user.name}</p>
                  <p className="pl-3 pr-3 pt-1 pb-1 text-lg ">{message.message}</p>
               </div>
              </div> : <div key={message.id} className="w-full h-full flex flex-col items-start gap-5 p-1 " ref={index === messages.length - 1 ? lastMessageRef : null} >
            <div className="max-w-3/6 bg-white  flex flex-col overflow-hidden whitespace-normal rounded-xl font-serif">
            <p className="text-sm font-semibold pl-2 pt-2 pr-2">{message.user.name}</p>
            <p className="pl-3 pr-3 pt-1 pb-1 text-lg ">{message.message}</p>
            </div>
            </div> )
           }
           else{
            return(userInfo.userId === message.userId ? <div key={message.id} className="w-full h-full flex flex-col text-white items-end gap-5 p-1" ref={index === messages.length - 1 ? lastMessageRef : null}>
            <div className="max-w-2/6 fit bg-black flex flex-col overflow-hidden whitespace-normal rounded-tr-xl rounded-tl-xl rounded-bl-xl font-serif  p-2">
                 <p className="text-white  text-sm">{message.user.name}</p>
                  <img  src={message.message} alt="pics"  className="w-full h-60 p-2 m-1"/>
               </div>
              </div> : <div key={message.id} className="w-full h-full flex flex-col items-start gap-5 p-1 " ref={index === messages.length - 1 ? lastMessageRef : null} >
            <div className="max-w-2/6 h-fit bg-black  flex flex-col overflow-hidden whitespace-normal rounded-xl font-serif p-2">
            <p className="text-white  text-sm">{message.user.name}</p>
            <img  src={message.message} alt="pics"  className="w-full h-60 p-2 m-1"/>
            </div>
            </div> )
           }
        }) : <div className="text-black font-serif flex flex-col justify-center items-center mt-32 ">
             <p className="text-2xl ">Click on the below Link to Join Groups</p>
             <button className="text-white bg-black p-2 m-1 rounded-lg mt-5" onClick={()=>openJoinGroupModal()}>Join Groups</button>
        </div>
      }
        </div>
        </div>
        <div className="w-full h-[20%] flex justify-center items-center">
          <MessageInput group={group} socket={socket} userInfo={userInfo}  setMessages={setMessages}/>
        </div>
        </div>
      
  )
}

export default Message