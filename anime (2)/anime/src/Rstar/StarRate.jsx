import React, { useState } from "react";
// Default number of stars
import "./StarRate.css"
import { FaRegStar } from "react-icons/fa6";
const no_of_Stars = 5;

function StarRate({ value = 0, noofStar = no_of_Stars }) {
 const[howeverIndex,setHoweverIndex]=useState(-1);
const[clickedIndex,setClickedIndex]=useState(value-1);
const handleClick=(index)=>{
  setClickedIndex(index);
  onChange(index+1)
}
const handleMouseEnter=(index)=>{
 setHoweverIndex(index)
}
const handleMouseLeave=()=>{
setHoweverIndex(-1);
}
  return (
    <div className="star-rating">
      {[...new Array(noofStar)].map((_, index) => {
        let starClass="stars";
        if(index<=clickedIndex)
        {
          starClass+=" active";
        }
        if(index<=howeverIndex && howeverIndex>-1){
          starClass+=" howeverd";
        }
        return  <button
        onMouseEnter={()=>handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
         key={index} onClick={()=>handleClick(index)}>
        <FaRegStar  className={starClass}/>
      </button>
      })}
    </div>
  );
}

export default StarRate;
