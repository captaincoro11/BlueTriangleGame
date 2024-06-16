import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { MyContext } from './Context';
import axios from 'axios';
import { url } from './constant';

const Leaderboard = () => {
   const {Leaderboard , setLeaderboard}  = useContext(MyContext);
   const [userNames,setUsernames] = useState([]);
   const [time,setTime] = useState('5m')
   const [Loading,setIsLoading] = useState(false)
   useEffect(() => {
   const socket = io('http://localhost:4000'); // Replace with your WebSocket server URL

    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

   
    socket.emit('getLeaderBoard', time); // Fetch initial leaderboard data for the last 5 minutes

    socket.on('LeaderBoardData', (data) => {
        setLeaderboard(data);
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, [time]);


  useEffect(()=>{
   if(Leaderboard.length>0){
    try {
      setIsLoading(true);
      const convertUsernames = async(id)=>{
        try {
  
          const token = localStorage.getItem("token")
          const response = await axios.get(`${url}user/getUsername/${id}`,{
            headers:{
              "Authorization":`Bearer ${token}`,
              "Content-Type":"Application/json" 
            }
          });

  
         return response.data.username
          
        } catch (error) {
          console.error(error)
          
        }
       
      }
      let a =[]

      const mappingLeaderBoard = async()=>{

        Leaderboard.map(async(item,index)=>{
          const b = await (convertUsernames(item.userId));
          console.log(b)
          a.push(b)
     setUsernames([...a])

 
 
     });

 

      }

   mappingLeaderBoard()



  
     
  
      
     } catch (error) {
      console.error(error)
      
     }
     finally{
      setIsLoading(false)
     }


    }

  

  },[Leaderboard])


  console.log(userNames);

  if(Loading){
    <div>Loadnig</div>
  }
    
    



  if(Leaderboard.length===0){
    return (
      
      <div className='flex justify-center font-playwrite'>
    <div>
      <div className=' flex justify-center items-center mt-20 bg-blue-700 bg-opacity-25 p-4 text-white  rounded-md'>
        No Active Games in last {time}
      </div> 
      <div className='  bg-blue-400 p-2 rounded-md space-x-6'>
    <button value={'5m'} onClick={()=>{setTime('5m')}} className={time==='5m'?" bg-orange-500 w-20 p-2 rounded-md" :''}>5m</button>
    <button value={'10m'} onClick={()=>{setTime('10m')}} className={time==='10m'?" bg-orange-500 w-20 p-2 rounded-md" :''}>10m</button>

    <button value={'30m'} onClick={()=>{setTime('30m')}} className={time==='30m'?" bg-orange-500 w-20 p-2 rounded-md" :''}>30m</button>
    <button value={'1h'} onClick={()=>{setTime('1h')}} className={time==='1h'?" bg-orange-500 w-20 p-2 rounded-md" :''}>1h</button>


    </div> 
    </div>
      </div>
    )
  }

  return (
    <div className=' flex justify-center p-4 mt-8 font-playwrite'>
   
     
    <div className=' bg-blue-800 bg-opacity-25 p-8  h-4/5 w-4/5 rounded-md'>
    <div className=' flex flex-col md:flex-row justify-center space-x-9'>
      <h2 className='text-white text-3xl flex justify-center mt-2 '>Leaderboard</h2>
      <div className='  bg-blue-400 mt-4 md:mt-0 p-2 rounded-md space-x-2 md:space-x-6'>
    <button value={'5m'} onClick={()=>{setTime('5m')}} className={time==='5m'?" bg-orange-500 w-20 p-2 rounded-md" :''}>5m</button>
    <button value={'10m'} onClick={()=>{setTime('10m')}} className={time==='10m'?" bg-orange-500 w-20 p-2 rounded-md" :''}>10m</button>

    <button value={'30m'} onClick={()=>{setTime('30m')}} className={time==='30m'?" bg-orange-500 w-20 p-2 rounded-md" :''}>30m</button>
    <button value={'1h'} onClick={()=>{setTime('1h')}} className={time==='1h'?" bg-orange-500 w-20 p-2 rounded-md" :''}>1h</button>


    </div>
    </div>

      <div className='text-white mt-12 text-center '>
      <div className=' grid grid-cols-3 gap-x-4'>
        <h1>Username</h1>
        <h1>Triangles</h1>
        <h1>Score</h1>

      </div>
        {Leaderboard.map((user, index) => (
         <div className='grid grid-cols-3 gap-y-4 gap-x-4 mt-2 justify-evenly'>
         {
          <div>
            {
              userNames[index]
            }
          </div>
         }
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
