import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import CardInfo from './components/CardInfo'
function Songs() {

  const songs = useSelector(state => state.songs);
  const [search, setSearch] = useState("");

  return (
    <div className='w-[80%] m-auto border-1 border-black mt-20 p-5 shadow-sm rounded-xl relative  backdrop-blur-3xl overflow-hidden '>
      <div className="absolute top-0 bottom-0 left-0 right-0  bg-white opacity-[0.5]"></div>
      <div className='flex justify-between mb-5 items-center relative z-20'>
        <span>Count: <b>{songs.length}</b></span>

        <div className='gap-2 flex '>
          <input type='search' value={search} placeholder='search' className='rounded-full p-2'
            onChange={(e) => setSearch(e.target.value)}
          />
          <NavLink to={"/dashboard/add-song"}>
            <button className='border-0 rounded-full bg-slate-500 p-2 px-4 text-white font-semibold'>Add new</button>
          </NavLink>
        </div>

      </div>

      <div className='grid grid-cols-4 gap-4 relative'>
        {songs.length > 0 ? (
          <>
            {songs?.map((song, index) => (
              <CardInfo imgUrl={song.imgUrl} key={song._id} type={"album"}>
                <p>{song.name}</p>
                <p>{song.artist}</p>
              </CardInfo>
            ))}
          </>

        ) : (
          <div className='text-center'>No song found</div>
        )}
      </div>
    </div>
  )
}

export default Songs