import React, { useContext, useState } from "react";
import "./app.css";
import Nav from "./navbar/nav";
import Lights from "./lightchanger/SwitchStyles.jsx";
// import Pages from "./info/pages.jsx"; 
import Menu from "./MenuBar/Menu.jsx"
import { BrowserRouter as Router ,Route,Routes, Navigate} from "react-router-dom";
import Home from "./pages/home.jsx";
import Subbed from "./pages/subbed.jsx";
import Dubbed from "./pages/dubbed.jsx";
import Series from "./pages/series.jsx";
import Movies from "./pages/movies.jsx";
import Popular from "./pages/popular.jsx";
import TopComments from "./Comments/TopComments.jsx";
 import { ContextProvider } from "./Comments/Context/Context.jsx";
import StarRate from "./RStar/StarRate.jsx";
import MessageScroll from "./Comments/MessageScroll.jsx"
import EmailVerify from "./LoginPage/EmailVerify.jsx";
import ResetPassword from "./LoginPage/ResetPassword.jsx";
import RegisterLogin from "./LoginPage/RegisterLogin.jsx";
import UserHome from "./LoginPage/UserHome.jsx";
import { ToastContainer, toast } from 'react-toastify';
import { AppContext, AppContextProvider } from "./LoginPage/Context/Appcontext.jsx";
import Chatprofile from "./Chat/chatprofile.jsx";
import Chathome from "./Chat/chathome.jsx";
export default function App() {
  const isLoggedin=useContext(AppContext)
  return (
    <div>
      <Router>
      <Menu className='menu'/>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Subbed" element={<Subbed/>}/>
        <Route path="/Dubbed" element={<Dubbed/>}/>
        <Route path="/Series" element={<Series/>}/>
        <Route path="/Movies" element={<Movies/>}/>
        <Route path="/Rating" element={<StarRate value={0}/>}/>
       <Route path="/Register-Login" element={<RegisterLogin/>}/>
        <Route path="/Register-verify" element={<EmailVerify/>}/>
        <Route path="/Register-Resetpass" element={<ResetPassword/>}/>
         <Route path="/Comments" element={ <ContextProvider>
      <TopComments autoFocus={false}/>
      <MessageScroll/>
      </ContextProvider>}/>
        {isLoggedin ?(
          <>
        <Route path="/user-Home" element={<UserHome/>}/>
        <Route path="/chat-home" element={<Chathome/>}/>
        <Route path="/chat-profile" element={<Chatprofile/>} />
    </> ):(<Navigate to={"/Register-login"}/> )}
        </Routes>
      </Router>
      {/* <Nav /> */}
        {/* <Pages /> */}
      {/* <Lights /> */}
      <div>🤯😍🤣😮🫨😡😢 </div>
    </div>
  );
}
