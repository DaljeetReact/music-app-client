import React from 'react'
import { motion } from 'framer-motion'
import { AiOutlineLeft } from 'react-icons/ai'
import { useSelector } from 'react-redux'

function PlayList({setLsPlayListOpen,isPlayListOpen}) {
   const currentPlaylist =  useSelector(state=>state.currentPlaylist);
  return (
    <motion.div 
     initial={{ opacity: 0,x:50 }}
     animate={{ opacity: 1,x:0 }}
     exit={{ opacity: 0,x:50 }}
    className="fixed left-0 top-0 bottom-0 h-vh backdrop-blur-lg w-[400px] z-50">
    <div className='flex justify-between items-center p-2 mb-3'>
        <div className=' font-extrabold text-white'>
            PlayList <small>({currentPlaylist?.length})</small>
        </div>
     
        <div className="w-8 h-8  rounded-full bg-red-500 flex justify-center items-center text-white"
             onClick={()=>setLsPlayListOpen(!isPlayListOpen)}
        > 
            <AiOutlineLeft/>
        </div>
    </div>
       
        <div className="overflow-y-scroll h-full">
            <h4>ekmf</h4>
        </div>
    </motion.div>
  )
}

export default PlayList