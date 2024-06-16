import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "./constant";


export const MyContext = React.createContext();



export const MyProvider = ({children})=>{

    // useEffect(()=>{
    //     const fetchData = async()=>{
    //         try {
    //             const token = localStorage.getItem("token")
    //             const response = await axios.get(`${url}game/getAllGames`,{
    //                 headers:{

    //                     "Authorization":`Bearer ${token}`,
    //                     "Content-Type":"Application/json"
    //                 }
    //             });
    //             setLeaderboard(response.data.games)
    //         } catch (error) {
                
    //         }
    //     }

    //     fetchData()

    // },[])
    
    

    

    const [isOpen,setIsOpen] = useState(false);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [user,setUser] = useState("");
    const [Leaderboard,setLeaderboard] = useState([]);
    const onClose=()=>{
        console.log(isOpen)
        setIsOpen(false);
    }
    const values={
        isOpen,setIsOpen,onClose,isAuthenticated,setIsAuthenticated,user,setUser,Leaderboard,setLeaderboard
    }
    

    return (
        <MyContext.Provider value={values}>
        {children}
        </MyContext.Provider>
    )

}