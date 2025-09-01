import React, { useContext, useEffect, useState } from 'react'
import { MdMessage } from "react-icons/md";
import { MdMoreVert } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { AppContext } from '../LoginPage/Context/Appcontext';
import axios from 'axios';
import { FaUserCircle } from "react-icons/fa";
import { chatContext } from '../LoginPage/Context/ChatContext';

const Sidebars = () => {
  const {getusers,selectedUser,setSelectedUser
    ,setUnseenMessages,unseenMessages,users
  }=useContext(chatContext)
  const {setIsLoggedin,backendUrl,onlineUser,isLoggedin}=useContext(AppContext)
  const[input,setInput]=useState(false)
  
  const [uses,setUses]=useState([])
  const navigate=useNavigate()
  const filteredUsers=input ? users.filter((user)=> user.name.toLowerCase().includes(input.toLowerCase())) : users
  useEffect(()=>{
    getusers()
  },[onlineUser])
  return (
    <div className={`bg-slate-950 h-full p-5 rounded-r-xl overflow-y-auto text-white ${selectedUser? "max-md:hidden":''}`}>
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
        <MdMessage size={40} className='max-w-40' />
        <div className='relative py-2 group '>
          <MdMoreVert size={40} className='max-h-36 cursor-pointer'/>
          <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md
          bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
            <p onClick={()=>navigate('/chat-profile')} className='cursor-pointer'>Edit profile</p>
            <hr className='my-2 border-t border-gray-500'/>
            <p onClick={()=>setIsLoggedin(false)} className='cursor-pointer '>logout</p>
          </div>
        </div>
        </div>
        <div className='bg-stone-700 rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
          <FaSearch fontSize={50} className='w-8 h-8 m-4 '/>
          <input onChange={(e)=> setInput(e.target.value)} type='text' className='bg-transparent border-none  outline-none m-7
           text-white text-md placeholder-[#c8c8c8] flex-1' placeholder='search user...'/>
        </div>
      </div>
      <div  >
        {(!users || users.length ===0) &&(
          <div className='text-red-800 p-5'>no user found </div>
        )}
        {
          filteredUsers.map((user,index)=>(
            <div key={index}>
            <div onClick={()=>{
              setSelectedUser(user);
              setUnseenMessages(prev=>({
                ...prev,[user._id]:0}
            ))}} className={` flex flex-row relative p-2 pl-7 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id===user._id && 'bg-[#282142]50'}`}>
              <p className='pl-11 mr-2 mt-2 w-[40px] aspect-[1/1] rounded-full'> <FaUserCircle fontSize={35}/></p>
              <p className='pl-12 mt-4 text-lg '>{user.name}</p>
              {
                onlineUser.includes(user._id) ?
                <span className='text-green-400 text-xs'>online</span>
                :<span className='text-neutral-400'>offline</span>
              }
            </div>
            {
              unseenMessages[user._id] >0 && <p className='absolute top-4 right-4
              text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{unseenMessages[user._id]}
              </p>
            }
            </div>
          ))
        }
      </div>
    </div>
  )}
export default Sidebars
