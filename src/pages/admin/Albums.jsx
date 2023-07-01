import {useState} from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import CardInfo from "./components/CardInfo"


function Albums() {
  
  const albumsInfo =  useSelector(state=>state.albums);
  const [search, setSearch] = useState("");


  return (
    <div className='w-[80%] m-auto border-2 mt-20 p-5 shadow-sm rounded-lg  backdrop-blur-xl'>
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

      <div className='grid grid-cols-4 gap-4 justify-center items-center '>
        {albumsInfo.length > 0 ?(
          <>
            {albumsInfo?.map((album,index)=>(
              <CardInfo imgUrl={album.imgUrl} key={album._id} type={"album"}>
                <h3>{album.name}</h3>
              </CardInfo>
            ))}
          </>
          
        ):(
          <div className='text-center'>No Album found</div>
        )}

      </div>
    </div>
    );
}

export default Albums