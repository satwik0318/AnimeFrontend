import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import {Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import {SideMenu} from "./SideMenu.jsx";
import "./Menu.css"
import { IconContext } from 'react-icons';
import Search from "../searchbar/search.jsx"
import SearchResult from "../searchbar/searchResult.jsx"
const Menu = () => {
  const [sidebar,SetSidebar]=useState(false)
  const [results,SetResults]=useState([]);
  const showSidebar=()=> SetSidebar(!sidebar)
  return (
    <div > 
      <IconContext.Provider value={{color:'white'}}>
      <div className='menus'>
      <Link to="#" className='menu-bars'>
      <GiHamburgerMenu onClick={showSidebar} className='icon'/>
      </Link>
      </div>
      <div className={sidebar ? 'overlay active':'overlay'} onclick={showSidebar}></div>
      <nav className={sidebar ? 'nav-menu active':'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='menubar-toogle'>
            <Link to="#" className='menu-bars'>
            <IoClose/>
             </Link>
          </li>
          {SideMenu.map((item,index)=>{
            return(
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                {item.icon}
                 <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      </IconContext.Provider>
      <Search setResults={SetResults} />
      <SearchResult results={results}/>
    </div>
  );
};

export default Menu;
