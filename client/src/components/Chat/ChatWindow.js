import React from 'react'
import ChatHeader from './ChatHeader'
import Message from './Message'
import MessageInput from './MessageInput'

const ChatWindow = () => {
  return (
    <div className="flex flex-col w-full h-full no-scrollbar">
      <div className="w-full h-14">
        <ChatHeader />
      </div>
      <div className="w-full h-5/6 overflow-hidden overflow-y-auto mt-2 ">
      <Message  />
      </div>
      <div className="w-full h-1/6 flex justify-center items-center">
      <MessageInput  />
      </div>
    </div>
  )
}

export default ChatWindow