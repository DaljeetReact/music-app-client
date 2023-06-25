import {useState} from 'react';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { NavLink } from 'react-router-dom';
import { DeleteFileFromFireStore } from './components';


function Albums() {
  
  const albumsInfo =  useSelector(state=>state.albums);
  const [search, setSearch] = useState("");


  const Card = ({album,key}) =>{
   const {name,imgUrl,_id} = album;
    return(
      <motion.div className='overflow-hidden border-2 rounded-lg shadow-lg max-w-[210px] max-h-[210px] flex justify-center items-center flex-col cursor-pointer relative' key={_id}>
        <motion.img 
          whileHover={{scale:1.05}}
          src={imgUrl}
          className='h-[150px] w-full object-contain'
        />
        <div className='text-center leading-9 py-4'>
          <p className='font-semibold'>{name}</p>
        </div>
        <DeleteFileFromFireStore url={imgUrl} type={"albums"} id={_id}/>
      </motion.div>
    )
  }

  return (
    <div className='w-[80%] m-auto border-2 mt-20 p-5 shadow-sm rounded-lg'>
      <div className='flex justify-between mb-5 items-center'>
        <span>Count: <b>{albumsInfo.length}</b></span>
        
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
        {albumsInfo.length > 0 ?(
          <>
            {albumsInfo?.map((album,index)=>(<Card album={album} key={album._id}/>))}
          </>
          
        ):(
          <div className='text-center'>No song found</div>
        )}

      </div>
    </div>
    );
}

export default Albums