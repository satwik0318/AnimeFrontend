import React from 'react'
import "./SearchList.css"
const searchList = ({result}) => {
  return (
    <div className='search-list'>
      {result.name}
    </div>
  )
}

export default searchList
