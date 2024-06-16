import { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { MyContext } from "./components/Context";
import Modal from "./components/Modal";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Register from "./components/Register";
import Login from './components/Login'
import Game from "./components/Game";
import axios from "axios";
import { url } from "./components/constant";
import toast , {Toaster} from 'react-hot-toast'
import LeaderBoard from "./components/LeaderBoard";


function App() {
  const {isOpen,setIsOpen,isAuthenticated,setIsAuthenticated,user,setUser} = useContext(MyContext);
  
  
  useEffect(()=>{
    
    const fetchUser = async()=>{
      try {
        const token = localStorage.getItem("token");

      const response = await axios.get(`${url}user/loadUser`,{
        headers:{
          "Authorization":`Bearer ${token}`,
          "Content-Type":"Application/json"
        }
      });

      setIsAuthenticated(true);

      setUser(JSON.parse(response.data));



      toast.success("User Loaded Successfully")


        
      } catch (error) {

        
      }

    }

    fetchUser()
    

  },[isAuthenticated])
  return (
    <div >
    <Toaster/>
    <Router>
       <Navbar/>
       {isOpen?<Modal>LetsGo</Modal>:""}
       
        <Routes>
          <Route path="/register" element={isAuthenticated?<Game/>:<Register/>}/>
          <Route path="/login" element={isAuthenticated?<Game/>:<Login/>}/>
          <Route path='/' element={isAuthenticated?<Game/>:<Login/>}/>
          <Route path="/leaderboard" element={isAuthenticated?<LeaderBoard/>:<Login/>}/>
        </Routes>
       </Router>


    </div>
  );
}

export default App;
