import React from 'react'
import { MdOutlineSearch } from "react-icons/md";

const SearchBar = () => {
  return (
    <div className="flex justify-center items-center w-full border border-solid border-1 rounded-xl bg-slate-100">
      <MdOutlineSearch className="h-fit w-fit text-xl"/>
      <input type="text" name="search"  className="bg-slate-100 rounded-xl text-sm w-4/5 m-2 p-1  border-none focus:outline-none font-serif" placeholder='Search People,Group and Messages'/>
    </div>
  )
}

export default SearchBar

