import React, { useContext, useState } from 'react'
import { MyContext } from './Context';
import { Link } from 'react-router-dom';

const Modal = () => {
    const {onClose,isAuthenticated,setIsAuthenticated} = useContext(MyContext);
    const handleLogout=()=>{
      try {
        localStorage.setItem("token",null);

        setIsAuthenticated(false);
        onClose();
        
      } catch (error) {
        console.log(error)
      }
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="bg-white p-8 rounded shadow-lg space-y-2 z-10">
          <button onClick={onClose} className=' cursor-pointer'> &times;</button>
            <p onClick={onClose}><Link to='/' className=" cursor-pointer">Game</Link></p>
            <p onClick={onClose}><Link to='/leaderboard' className=" cursor-pointer">LeaderBoard</Link></p>
            {isAuthenticated?<button onClick={handleLogout} className=" bg-blue-500 font-mono mt-6 text-white p-2 rounded-md cursor-pointer">Logout</button>:<Link to='/login' onClick={onClose} className=" bg-blue-500 font-mono mt-6 text-white p-2 rounded-md cursor-pointer">Signin</Link>}

            
          </div>
        </div>
      );
    };


export default Modal
