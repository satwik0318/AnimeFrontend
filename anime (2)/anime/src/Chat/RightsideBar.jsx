import React, { useContext, useEffect, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FaU } from 'react-icons/fa6';
import { chatContext } from '../LoginPage/Context/ChatContext';
import { AppContext } from '../LoginPage/Context/Appcontext';
const RightsideBar = () => {
  const {selectedUser,messages}=useContext(chatContext)
  const{isLoggedin,onlineUser}=useContext(AppContext)
  const [msgImages,setMsgImages]=useState([])
  // get all the images from the messages and set them to this.state
  useEffect(()=>{
    if(messages){
    setMsgImages(
      messages.filter(msg=>msg.image).map(msg=>msg.image)
    )
}},[messages])
return selectedUser && (
        <div className='p-5 overflow-y-auto'>
            {/* User Profile Section */}
            <div className='flex flex-col items-center mb-5'>
                <FaUserCircle fontSize={30} className='w-20 aspect-[1/1] rounded-full' />
                {onlineUser && onlineUser.includes(selectedUser._id) ? <p className='w-2 h-2 rounded-full bg-green-500 p-2 m-5'></p>:<p className='w-2 h-2 rounded-full bg-gray-500 p-2 ml-1 mt-4 '></p> }
                <h1 className='text-xl font-medium mt-2'>{selectedUser.name}</h1>
            </div>

            <hr className='my-4' />

            {/* Images Section */}
            <h2 className='text-lg font-semibold mb-3'>Shared Images</h2>
            {msgImages.length > 0 ? (
                <div className='grid grid-cols-2 gap-2'>
    {msgImages.map((image, index) => (
        <div key={index} className='w-full rounded-md overflow-hidden'> {/* ✅ Removed fixed height */}
            <img
                src={image}
                alt={`Message image ${index}`}
                className='w-full h-auto object-contain rounded-md' // ✅ object-contain shows full image
            />
        </div>
    ))}
</div>
            ) : (
                <p className='text-gray-400'>No images shared in this chat.</p>
            )}
        </div>
    )
}

export default RightsideBar;