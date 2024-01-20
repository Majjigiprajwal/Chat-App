import React from 'react'
import SearchBar from '../components/Search/SearchBar'
import ChatWindow from '../components/Chat/ChatWindow'
import GroupList from '../components/Group/GroupList'
import CreateGroup from '../components/Group/CreateGroup'
import GroupDetails from '../components/Group/GroupDetails'
import { IoIosChatbubbles } from "react-icons/io";

const Home = () => {
  return (
    <div className="w-full max-h-screen flex ">
      <div className="bg-white w-1/5 h-screen pt-3 pb-3 ">
        <div className="flex justify-center items-center  gap-4 border-r border-solid ">
        <IoIosChatbubbles className="text-5xl text-black"/>
        <h1 className="text-4xl text-black font-serif font-bold">Lets Chat</h1>
        </div>
        <hr></hr>
        <div className="w-full h-14 pl-4 pr-4 mt-5 mb-3">
        <SearchBar /> 
        </div>
        <hr></hr>
        <div className="w-full h-4/6 no-scrollbar"> 
          <GroupList />
          <CreateGroup />
        </div> 
      </div>
      <div className="w-3/5 h-screen bg-slate-100">
         <ChatWindow />
      </div>
      <div className="w-1/5 h-screen bg-white">
          <GroupDetails />
      </div>
    </div>
  )
}

export default Home