import {useState} from 'react';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { NavLink } from 'react-router-dom';

import { defaultMusicIcon } from '../../assets/img';
function Songs() {

  const songs =  useSelector(state=>state.songs);
  const [search, setSearch] = useState("");


  const SongCard = ({song,key}) =>{
   const {name,imgUrl,songUrl,album,artist,category,_id} = song;
    return(
      <motion.div className='p-2 border-2 rounded-lg shadow-lg max-w-[210px] max-h-[210px] flex justify-center items-center flex-col cursor-pointer' key={key}>
        <motion.img 
          whileHover={{scale:1.05}}
          src={defaultMusicIcon}
          className='w-[100px] object-contain'
        />
        <div>
          <p>{name}</p>
          <p>{artist}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className='w-[80%] m-auto border-2 mt-20 p-5 shadow-sm rounded-lg'>
      <div className='flex justify-between mb-5 items-center'>
        <span>Count: <b>{songs.length}</b></span>
        
        <div className='gap-2 flex '>
          <input type='search' value={search} placeholder='search' className='rounded-full p-2'
            onChange={(e)=>setSearch(e.target.value)}
           />
           <NavLink to={"/dashboard/add-song"}>
               <button className='border-0 rounded-full bg-slate-500 p-2 px-4 text-white font-semibold'>Add new</button>
           </NavLink>
        </div>
        
      </div>

      <div className='grid grid-cols-4 gap-4   '>
        {songs.length > 0 ?(
          <>
            {songs?.map((song,index)=>(<SongCard song={song} key={song._id}/>))}
          </>
          
        ):(
          <div className='text-center'>No song found</div>
        )}

      </div>
    </div>
  )
}

export default Songs