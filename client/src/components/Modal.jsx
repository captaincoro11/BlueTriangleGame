import React, { useContext } from 'react'
import { MyContext } from './Context';

const Modal = () => {
    const {onClose} = useContext(MyContext);
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="bg-white p-8 rounded shadow-lg space-y-2 z-10">
          <button onClick={onClose} className=' cursor-pointer'> &times;</button>
            <p className=" cursor-pointer">Game</p>
            <p className=" cursor-pointer">LeaderBoard</p>
            <button className=" bg-blue-500 font-mono mt-2 text-white p-2 rounded-md cursor-pointer">Signin</button>

            
          </div>
        </div>
      );
    };


export default Modal
