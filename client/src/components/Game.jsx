import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { url } from './constant'
import toast , {Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti';
import './Game.css'
import beep from '../assets/beep-07a.mp3'
import confettisound  from '../assets/confetti.mp3'
import io from 'socket.io-client'
import { MyContext } from './Context'


const socket = io('https://blue-triangle-game.vercel.app/')



const shapes = ['square', 'circle', 'triangle'];
const colors = ['red', 'yellow', 'blue', 'orange'];

const Game = () => {
    const [data,setData] = useState("");
    const router = useNavigate();
    const [shapesArray, setShapesArray] = useState([]);
    const [score,setScore] = useState(0);
    const [gameId,setGameId] = useState('');
    const {Leaderboard,setLeaderboard} = useContext(MyContext)
    

    const generateShape = () => {
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = Math.random() * 80;
        const y = Math.random() * 80;
        return { shapeType, color, x, y };
      };

      const refreshShapes=()=>{
        const shapesCount = Math.floor(Math.random()*11)+5;
        let ArrayShapes=[];
        for(let i=0;i<shapesCount;i++){
            const a=generateShape();
            ArrayShapes.push(a);

        }
        setShapesArray([...ArrayShapes])
      }

      const handleShapeClick = (shape,index) => {
        
        if (shape.color === 'blue' && shape.shapeType === 'triangle') {
          setScore(score + 10);
          let arr=[];
          const len = index;
          const newArr =shapesArray;
          newArr.filter((item,index)=>{
            if(index===len){
              

            }
            else
            arr.push(item)


          });

          setShapesArray([...arr])
          

          new Audio(confettisound).play();

          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } else {
         
          new Audio(beep).play();
        }
      };

      useEffect(() => {
        refreshShapes();
        const interval = setInterval(refreshShapes, 60000); // Refresh every 1 minute
        return () => clearInterval(interval);
      }, []);


      useEffect(()=>{
        const PostData=async()=>{

          try {
            const token = localStorage.getItem("token");

            const response = await axios.post(`${url}game/newGameSession`,{},{
              headers:{
                "Authorization":`Bearer ${token}`,
                "Content-Type":"Application/json"
              }
            });

            setGameId(response.data.newGame.id)



          

          
          } catch (error) {
            toast.error(error.message)
            
          }

        }

        PostData();

       

      },[]);

      useEffect(()=>{
        const updateScore = async()=>{
          try{
            const token =localStorage.getItem('token')

            const response = await axios.put(`${url}game/updateScore/${gameId}`,{
              score,blueTriangles:(score/10)
            },{
              headers:{
                "Authorization":`Bearer ${token}`,
                "Content-Type":"Application/json"
              }
            });

            console.log(response.data.message);
            console.log(Leaderboard)


          }
          catch(error){

            console.log(error)

          }
        }
        updateScore()

      },[score]);

      useEffect(()=>{

        socket.on('leaderboard_update', (data) => {
          setLeaderboard(data);
        });

        return () => {
          socket.off('leaderboard_update');
        }

      },[score])

    


  return (
    

    <div className='flex justify-center mt-12'>
    
     <div className='border-none fixed w-11/12 md:4/5 lg:w-3/5 h-3/5 grid grid-cols-3 gap-4 rounded-md shadow-lg shadow-orange-500'>
    {shapesArray.map((shape, index) => (
          <div
            key={index}
            className={`shape ${shape.shapeType} ${shape.color} absolute cursor-pointer transition-transform duration-200`}
            style={index%2==0?{ left: `${shape.x}%`, top: `${shape.y}%` }:{right: `${shape.x}%`, bottom: `${shape.y}%`}}
            onClick={() => handleShapeClick(shape,index)}
          ></div>
        ))}

       
       
    </div>
    <div className='fixed top-3/4 text-white font-semibold bg-orange-500 rounded-md p-2 font-playwrite '>
        Score:{score}
    </div>
    <p className= 'fixed text-xl bottom-8 font-playwrite text-white'>Play Area</p>
    </div>
  )
}

export default Game
