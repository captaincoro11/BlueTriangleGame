import React, { useContext, useState } from 'react'
import { IoReorderThreeOutline } from "react-icons/io5";
import Modal from './Modal';
import { MyContext } from './Context';
import {Link} from 'react-router-dom'
import toast,{Toaster} from 'react-hot-toast';

const Navbar = () => {
    const {isOpen,setIsOpen,isAuthenticated,setIsAuthenticated} = useContext(MyContext);
    const onClose = ()=>{
        setIsOpen(!isOpen);   
    };
    const handleLogout=()=>{
      try {
        localStorage.setItem("token",null);
        setIsAuthenticated(false)
        toast.success("Logout Successfully")
        
      } catch (error) {
        toast.error("Cannot Logout")
        
      }
    }

  return (
    <>

    
    <div className='  bg-blue-950 text-white border-b-2 flex p-4 justify-between'>
    <Toaster/>

       <div className= ' text-md text-center md:text-xl font-playwrite font-semibold bg-orange-600 p-1 md:p-2 text-black rounded-md italic '>
         Eedee Foundation
       </div>
       <div className=' hidden md:flex md:text-2xl font-playwrite font-bold '>
        Burst The Triangle
       </div>
       <div className='hidden md:flex space-x-10  font-playwrite text-md mr-4'>
        <Link to='/' className='cursor-pointer font-bold mt-2'>Game</Link>
        <Link to='/leaderboard' className='cursor-pointer font-bold mt-2'>LeaderBoard</Link>
       { isAuthenticated?<button onClick={handleLogout} className='bg-blue-600 p-2 text-white rounded-md font-mono hover:bg-white hover:border hover:border-blue-600 hover:text-blue-500'>Logout</button>:<Link to='/login' className='bg-blue-600 p-2 text-white rounded-md font-mono hover:bg-white hover:border hover:border-blue-600 hover:text-blue-500'>Signin</Link>}
       </div>
       <div className='flex md:hidden'>
         <button onClick={()=>{setIsOpen(true)}}><IoReorderThreeOutline color='white' size={32} /></button>
         

       </div>



      
    </div>
    </>
  )
}

export default Navbar
