import React,{useState,useEffect} from 'react'
import SearchBar from '../components/Search/SearchBar'
import ChatWindow from '../components/Chat/ChatWindow'
import GroupList from '../components/Group/GroupList'
import CreateGroup from '../components/Group/CreateGroup'
import GroupDetails from '../components/Group/GroupDetails'
import { IoIosChatbubbles } from "react-icons/io";
import Modal from 'react-modal'
import CreateGroups from '../Modals/CreateGroups'
import JoinGroup from '../Modals/JoinGroup'
import axios from 'axios';
import io from "socket.io-client";

const Home = () => {
  const socket = io.connect("http://localhost:4000");
  const [isUpdateModal,setIsUpdateModal] = useState(false)
  const [isJoinGroupModal,setIsJoinGroupModal] = useState(false)
  const [groups,setGroups] = useState([])
  const [group,setGroup] = useState('')
  const closeModal = ()=>{
    setIsUpdateModal(false)
    setIsJoinGroupModal(false)
  }

  const openUpdateModal = ()=>{
    setIsUpdateModal(true)
  }

  const openJoinGroupModal = ()=>{
    setIsJoinGroupModal(true)
  }
  const token = JSON.parse(localStorage.getItem('token'))


  useEffect(()=>{
         const getGroups = async ()=>{
            try{
              const response = await axios.get(`http://localhost:4000/get-groups`,{
                headers :{
                  'Authorization': `Bearer ${token}`
                }
              }) 
              setGroups((prev)=>response.data.data)
            }
            catch(error){
               console.log(error)
            }
         }
          getGroups()
  },[token])

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
          <GroupList setGroup={setGroup} groups={groups} />
          <CreateGroup openUpdateModal={openUpdateModal}/>
        </div> 
      </div>
      <div className="w-3/5 h-screen bg-slate-200">
         <ChatWindow  group={group} openJoinGroupModal={openJoinGroupModal} socket={socket}/>
      </div>
      <div className="w-1/5 h-screen bg-white">
          <GroupDetails group={group} />
      </div>
      <Modal isOpen={isUpdateModal}  className="flex items-center justify-center h-screen w-full">
          <CreateGroups closeModal={closeModal} setGroups={setGroups} />
      </Modal>
      <Modal isOpen={isJoinGroupModal}  className="flex  justify-center items-center h-screen w-full">
          <JoinGroup closeModal={closeModal} setGroups={setGroups} />
      </Modal>
    </div>
  )
}

export default Home