import React from 'react'
import "./SearchResult.css"
import SearchList from "./searchList.jsx"
const result = ({results}) => {
  return (
    <div className='results-list'>
{
  results.map((result,id)=>{
    return <SearchList result={result} key={id}/>
  })
}

    </div>
  )  
}

export default result
