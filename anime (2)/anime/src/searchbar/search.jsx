import React, { useState } from 'react'
import "./search.css"
import { FaSearch } from 'react-icons/fa'
const search = ({setResults}) => {
  const [input,setInput]=useState("")
  const fetchData=(value)=>{
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((Response)=>
      Response.json())
    .then((json)=>{
       const results =json.filter((user)=>{
        return(  
          value && 
          user && 
          user.name 
          && user.name.toLowerCase().includes(value)
       )
      })
      setResults(results)
      })
    }

    const handleChange = (e) => {
      const value = e.target.value
      setInput(value)
      fetchData(value)
    }
  return (
    <div className='input-wrapper'>
      <FaSearch id="search-icon"/>
      <input placeholder=' type to search' onChange={handleChange}  />
    </div>
  )
}

export default search
