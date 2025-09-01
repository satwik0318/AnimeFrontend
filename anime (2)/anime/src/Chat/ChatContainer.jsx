import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoIosChatboxes } from "react-icons/io";
import { GrGallery } from "react-icons/gr";
import { IoSendSharp } from "react-icons/io5";
import { chatContext } from '../LoginPage/Context/ChatContext';
import { AppContext } from '../LoginPage/Context/Appcontext';
import { toast } from 'react-toastify'; 
const ChatContainer = () => {
  const {messages,selectedUser,setSelectedUser,sendMessage
    ,getMessages}=useContext(chatContext)
  const {userData,onlineUser}=useContext(AppContext)
  const ScrollEnd=useRef()
  const[input,setInput]=useState('')
  const handleSendMessage=async(e)=>{
    e.preventDefault()
    if(input.trim()==="") return null;
   try {
     await sendMessage({text:input.trim(),reciverId:selectedUser?._id})
     setInput("")
   } catch (error) {
    toast.error("failed to send message")
    console.error("send message error:",error)
   }
  }
  // handle sending an image
  const handleSendImage=async(e)=>{
    const file=e.target.files[0];
    if(!file || !file.type.startsWith("image/")){
      toast.error("select an image file")
      return 
    }
    const reader=new FileReader()
    reader.onload=async()=>{
      await sendMessage({image:reader.result})
      e.target.value=""
    }
    reader.readAsDataURL(file)
  }
  useEffect(()=>{
    if(selectedUser?._id){
      getMessages(selectedUser._id)
    }
  },[selectedUser])
useEffect(()=>{
  if(ScrollEnd.current && messages){
  ScrollEnd.current.scrollIntoView({behavior:"smooth"})
}},[messages])
  return selectedUser ? (
    <div className='h-full overflow-auto relative backdrop-blur-lg'>
      {/* header */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
   {selectedUser?.profilePic ? <img src={selectedUser.profilePic} /> :  <FaUserCircle fontSize={35} className='w-8 rounded-full'/> }
      <p className='flex-1 text-lg flex items-center gap-2'> { selectedUser?.name}</p>
      <span className={`w-2 h-2 rounded-full ${onlineUser.includes(selectedUser._id)? 'bg-green-500' : 'bg-gray-700'}`} ></span>
      <IoMdInformationCircleOutline fontSize={35}  className='max-md:hidden min-w-5'/>
      </div>
      {/* chat Area  */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-auto p-3 pb-6'>
        {messages && messages.map((msg,index)=>(
          <div key={index} className={`flex items-end gap-2 mb-4  ${msg.senderId!==userData?._id? 'flex-row':'flex-row-reverse '}`}>
          {/* message Bubble */}
          <div>
            <div className={`p-2 max-w-[200px] md:text-sm rounded-lg mb-4  break-all ${msg.senderId===userData?._id? 'bg-blue-600 text-white':'bg-slate-200 text-slate-900'}`}>
              {msg.text &&<span>{msg.text}</span>}
              {
                msg.image &&(
                  <img
                  src={msg.image}
                  alt='shared image'
                  className='w-full h-auto rounded-lg max-w-[180px] max-h-[200px] object-cover'
                  />
                )}
            </div>
            <div className='text-center text-xs'>
              {msg.senderId ===userData?._id ?(
                userData.profilePic ?(
                  <img src={userData.profilePic} className='w-6 h-6 rounded-full' alt="profile"/>
                ):(
                  <FaUserCircle fontSize={20 } className='text-gray-500 border border-gray-700 rounded-lg overflow-hidden mb-8'/>
                )
              ): selectedUser?.profilePic ?(
                <img src={selectedUser.profilePic} className='w-6 h-6 rounded-full' alt="profile"/>
              ):(
              <FaUserCircle fontSize={20 } className='text-gray-500 border border-gray-700 rounded-lg overflow-hidden mb-8'/>
              )}
            <div className='text-gray-500 '>{msg.createdAt}</div>
          </div>
          </div>
          </div>
        ))}
        <div ref={ScrollEnd}></div>
      </div>
      {/* bottom Area  */}
      <div className=' absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 '>
        <div className='flex-1 flex items-center bg-slate-700 rounded-full px-3'>
          <input  onChange={(e)=>setInput(e.target.value)} value={input} onKeyDown={(e)=>e.key==="Enter" ? handleSendMessage(e):null} type="text" placeholder='send a message'
           className='flex-1 text-sm py-3 border-none placeholder-gray-400 '/>
          <input onChange={handleSendImage} type="file" id='image' accept='image/png,image/jpeg ' hidden />
          <label htmlFor="image">
            <GrGallery fontSize={24} className='w-5 mr-2  cursor-pointer bg-orange-200'/>
          </label>
        </div>
        <IoSendSharp onClick={handleSendMessage} fontSize={25} className='w-7 cursor-pointer'/>
      </div>
    </div>
  ):(
    <div className='flex flex-col items-center justify-center h-screen bg-white/10 max-md:hidden'>
<IoIosChatboxes fontSize={120} className='h-40 w-60'/>
<p className=' text-4xl  flex '> Chat with me  </p>
    </div>
  )
}

export default ChatContainer
