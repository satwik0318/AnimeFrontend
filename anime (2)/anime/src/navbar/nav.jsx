import React from 'react'
import './nav.css'
import minato from "../assets/minato.jpg"
//import Switch from "../lightchanger/SwitchStyles"
const nav = () => {
  return (
    <div className='navbar'>
      <nav className="navi">navbar</nav>
      <img src={minato} className='minato' />
      <div className='search-box'> 
        <input type="text"  placeholder='search'/>
        {/* <Switch className="switch"/> */}
      </div>
    </div>
  )
}

export default nav
