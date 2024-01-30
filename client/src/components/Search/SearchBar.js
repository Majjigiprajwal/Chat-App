import React,{useState,useEffect} from 'react'
import { MdOutlineSearch } from "react-icons/md";
import axios from 'axios'

const SearchBar = ({groups,setGroups}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const token = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
      const delayDebounceFn = setTimeout( async () => {
        try{
          const response = await axios.get(`http://localhost:4000/search-groups?searchTerm=${searchTerm}`,{
            headers :{
              'Authorization': `Bearer ${token}`
            }
          }) 
          console.log(response.data.data)
          setGroups(response.data.data)
        }
        catch(error){
               console.log(error)
        }
    }, 300); 

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex justify-center items-center w-full border border-solid border-1 rounded-xl bg-slate-100">
      <MdOutlineSearch className="h-fit w-fit text-xl"/>
      <input type="text"
       name="search"
       className="bg-slate-100 rounded-xl text-sm w-4/5 m-2 p-1  border-none focus:outline-none font-serif"
       placeholder='Search Group'
       onChange={handleInputChange}
       />
    </div>
  )
}

export default SearchBar

