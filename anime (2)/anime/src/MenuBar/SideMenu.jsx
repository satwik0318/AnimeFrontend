import React from 'react'
import { FaHome } from "react-icons/fa";
import { FaClosedCaptioning } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";
import { GiTv } from "react-icons/gi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaComments } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
export const SideMenu=[
    {
        title:'Register login ',
        path:'/Register-Login',
        icon:<RiLoginBoxFill /> ,
        cName:'menu-text'
    },
    {
        title:'Home',
        path:'/',
        icon:<FaHome/> ,
        cName:'menu-text'
    },
    {
        title:'subbed-anime',
        path:'/subbed',
        icon:<FaClosedCaptioning/> ,
        cName:'menu-text'
    },
    {
        title:'dubbed-anime',
        path:'/dubbed',
        icon:<FaMicrophone/> ,
        cName:'menu-text'
    },
    {
        title:'Rating',
        path:'/Rating',
        icon:<FaStar/> ,
        cName:'menu-text'
    },
    {
        title:'movies',
        path:'/movies',
        icon: <BiSolidCameraMovie/>,
        cName:'menu-text'
    },
    {
        title:'Chatting ',
        path:'/chat-home',
        icon:< IoChatbubbleOutline />,
        cName:'menu-text'
    },
     {
        title:'comments',
        path:'/Comments',
        icon:<FaComments/>,
        cName:'menu-text'
    },
]
