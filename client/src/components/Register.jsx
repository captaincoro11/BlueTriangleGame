import React, { useContext, useState } from 'react'
import axios from 'axios'
import {url} from './constant'
import toast,{Toaster} from 'react-hot-toast'
import { Link } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import { MyContext } from './Context'



const Register = () => {
  const [username,setUsername] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [isLoading,setIsLoading] =useState();
  const {isAuthenticated,setIsAuthenticated} = useContext(MyContext);

  const handleClick =async()=>{

    try {
      setIsLoading(true);
      
      const response =await axios.post(`${url}user/register`,{
        username,email,password
      },{
        headers:{
          "Content-Type":"Application/json"
        }
      });

      toast.success(response.data.message);
      localStorage.setItem("token",response.data.token);
      setIsAuthenticated(true)
      
    } catch (error) {
      setIsLoading(false)
      toast.error(error.response.data.message);
      
    }finally{
      setIsLoading(false)
    }

  }
 


  return (
    <div className=' flex items-center justify-center font-playwrite'>
    <Toaster/>

    <div className=' bg-blue-800 md:w-1/2 p-2 bg-opacity-25 mt-24 rounded-lg'>
        <div className=' flex justify-center'>
        <div>
        <h1 className=' font-playwrite p-2 text-white text-2xl md:text-4xl text-center font-semibold'>Register</h1>
        <div className='mt-6 space-x-4'>
            <div className='text-white text-md' htmlFor="">Username</div>
       <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter Your Username' className=' border-none p-2 w-80 outline-none rounded-md' type="text" />
        </div>
        <div className='mt-6 space-x-4'>
            <div className='text-white text-md' htmlFor="">Email</div>
       <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email' className=' border-none p-2 outline-none w-80 rounded-md' type="text" />
        </div>
        <div className='mt-6 space-x-4'>
            <div className='text-white text-md' htmlFor="">Password</div>
       <input value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Enter Your Password' className=' border-none w-80 outline-none p-2 rounded-md' type="text" />
        </div>
        
        </div> 
        

        </div>
       <div className=' mt-6 flex justify-center'>
       <button onClick={handleClick} className=' font-mono text-white w-40  mb-4 bg-orange-600 p-2 rounded-md'>{isLoading? <ClipLoader
        loading={isLoading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />:"SignUp"}</button>
       </div> 
       <div className='text-center mb-4'>
        <p className="text-white text-sm font-playwrite">Already Registered?<Link to='/login' className='text-orange-600 cursor-pointer font-playwrite'>Click Here</Link></p>
       </div>
    </div>

       
      
    </div>
  )
}

export default Register
