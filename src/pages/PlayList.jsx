import React from 'react'
import { motion } from 'framer-motion'
import { AiOutlineLeft } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import {RiMusic2Line,RiPauseCircleFill} from 'react-icons/ri'
import { setSongIndex } from '../store/reducers'

function PlayList({setLsPlayListOpen,isPlayListOpen}) {
   const {currentPlaylist,songIndex,isSongPlaying} =  useSelector(state=>state);
   const dispatch =  useDispatch()

   const selectSong = (index)=>{
        dispatch(setSongIndex(index));
   }

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
        {currentPlaylist?.length > 0 ?(
            <ul>
                {currentPlaylist.map(((song,index)=>(
                    <li className='flex w-fll bg-transparent p-3 gap-2 items-center border-b-[1px] border-black hover:bg-gray-300' key={`pl_list${song._id}`}
                        onClick={()=>selectSong(index)}
                    >
                        
                       {(index === songIndex && isSongPlaying)?(
                            <RiPauseCircleFill className="text-red-800"/>
                        ):(
                            <RiMusic2Line/>
                        )}
                        
                        {song.name}
                        
                    </li>
                )))}
            </ul>
        ):(
            <div className='text-center px-5'>
                No song found <br/> please add some song to list
            </div>
        )}
           
           
        </div>
    </motion.div>
  )
}

export default PlayList