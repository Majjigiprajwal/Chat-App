import React,{useState,useEffect} from 'react'
import ChatHeader from './ChatHeader'
import Message from './Message'
import MessageInput from './MessageInput'
import { parseJwt } from '../../util/jwtParser'

const ChatWindow = ({group,openJoinGroupModal,socket}) => {

  const [userInfo,setUserInfo] = useState({
    userId:'',
    userName:''
  })
  const token = JSON.parse(localStorage.getItem('token'))

  useEffect(()=>{
    const userData = parseJwt(token)
    setUserInfo({userId:userData.userId,userName:userData.userName})

 },[token])

  return (
    <div className="flex flex-col w-full h-full no-scrollbar">
      <div className="w-full h-14">
        <ChatHeader group={group} />
      </div>
      <div className="w-full h-5/6 overflow-hidden overflow-y-auto pl-6 pr-6 mt-1 ">
      <Message group={group} openJoinGroupModal={openJoinGroupModal} socket={socket} userInfo={userInfo}/>
      </div>
      <div className="w-full h-1/6 flex justify-center items-center">
      <MessageInput  group={group} socket={socket} userInfo={userInfo} />
      </div>
    </div>
  )
}

export default ChatWindow