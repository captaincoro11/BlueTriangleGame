import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { MyContext } from './Context';
import axios from 'axios';
import { url } from './constant';

const Leaderboard = () => {
   const {Leaderboard , setLeaderboard}  = useContext(MyContext);
   const [Loading,setLoading] = useState(false);
   const [userNames,setUsernames] = useState([]);
   const [time,setTime] = useState('5m')
   useEffect(() => {
   const socket = io('http://localhost:4000'); // Replace with your WebSocket server URL

    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

   
    socket.emit('getLeaderBoard', '30m'); // Fetch initial leaderboard data for the last 5 minutes

    socket.on('LeaderBoardData', (data) => {
        setLeaderboard(data);
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(()=>{
    





  
  },[])
  




  if(Loading){
    
    try {
      setLoading(true)
      const convertUsernames = async(id)=>{
        try {
  
          const token = localStorage.getItem("token")
          const response = await axios.get(`${url}user/getUsername/:${id}`,{
            headers:{
              "Authorization":`Bearer ${token}`,
              "Content-Type":"Application/json" 
            }
          });

          console.log(response)
  
         return response.data.username
          
        } catch (error) {
          console.error(error)
          
        }
       
      }
      let a =[]
  
      Leaderboard.map((item,index)=>{
           const b = convertUsernames(item.userId);
           a.push(b)
  
  
      });
  
      setUsernames([...a])
  
      
     } catch (error) {
      console.error(error)
      
     }
     finally{
      setLoading(false)
     }
   
  }

  console.log(Leaderboard);
  console.log(userNames);

  return (
    <div className=' flex justify-center mt-8'>
    <div className=''>
    <button className=''></button>
    </div>
     
    <div className=' bg-blue-800 bg-opacity-25 p-4  h-4/5 w-4/5 rounded-md'>
      <h2 className='text-white text-3xl flex justify-center mt-2 '>Leaderboard</h2>
      <div className='text-white '>
        {Leaderboard.map((user, index) => (
         <div className='grid grid-cols-3 gap-y-4 gap-x-4 justify-evenly'>
         <div className=''>
          {user.userId}
         </div>
         <div>
         {user.blueTriangles}


         </div>
         <div>
         {user.score}

         </div>


            
         </div>


        ))}
      </div>
    </div>
    </div>
  );
};

export default Leaderboard;
