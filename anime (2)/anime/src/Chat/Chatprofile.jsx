import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { BiMessage } from "react-icons/bi";
import { AppContext } from '../LoginPage/Context/Appcontext';
const chatprofile = () => {
  const {updateProfile,isLoggedin,userData,setIsLoggedin,getUserData}=useContext(AppContext)
  const [selectedImg,setSelectedImg]=useState()
  const navigate=useNavigate()
  const [name,setName]=useState(userData?.name ||'')
  const [bio,setBio]=useState( userData?.bio ||'')
  const handlesubmit=async(e)=>{
    e.preventDefault()
    if(!selectedImg){
      await updateProfile({name:name,bio:bio})
     await getUserData()
      navigate('/chat-home')
      return;
    }
    const reader=new FileReader()
    reader.readAsDataURL(selectedImg)
    reader.onload=async()=>{
      const base64Image=reader.result
      await updateProfile({profilePic:base64Image,name:name,bio:bio})
     await getUserData()
      navigate('/chat-home')
    }
  }
  useEffect(()=>{
    if(userData){
      setName(userData.name || '')
      setBio(userData.bio|| '')
    }
  },[userData])
  return (
    <div className='min-h-screen  flex items-center justify-center'>
     <div className='w-5/6 max-w-2xl  text-blue-800 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg' >
      <form onSubmit={handlesubmit} className='flex flex-col gap-5 p-10 flex-1' >
        <h3 className='text-lg'> profile details  </h3>
        <label htmlFor="avatar" className='flex'>
          <input onChange={(e)=>setSelectedImg(e.target.files[0])} type="file" id='avatar' accept='.png,.jpg,.jpeg' hidden />
          {selectedImg ?  ( <img src={URL.createObjectURL(selectedImg)} alt="" className={`w-12 h-12 ${selectedImg && 'rounded-full'}`} />) :(<FaUserCircle fontSize={33} className='mr-2'/>)}
          upload profile image
        </label>
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" required placeholder='your name' className='m-1 border border-gray-700  rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-800' />
        <textarea onChange={(e)=>setBio(e.target.value)} value={bio} placeholder='write profile bio' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-800' rows={4}></textarea>
        <button type='submit' className='bg-gradient-to-r from-bg-violet-800 to-blue-600 text-white p-2 rounded-full text-lg cursor-pointer' >save</button>
      </form>
      <div className="flex justify-center items-center ml-6 max-sm:ml-0">
          <BiMessage className="text-violet-400 drop-shadow-lg" size={200} />
        </div>
     </div>
    </div>
  )
}

export default chatprofile
