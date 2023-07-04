import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';




import CardInfo from './components/CardInfo'
import { AddSongToPlayList } from '../../store/reducers';
import { toast } from 'react-toastify';
import { SongAttributes } from './components';
function Songs() {

  const {songs,currentPlaylist} = useSelector(state => state);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const pushToPlayList = (song)=>{
    let list = [...currentPlaylist];
    let found = Object.values(list).find((obj) => {
      return obj._id === song._id
    });
    
    if (!found) {
       list.push(song);
       dispatch(AddSongToPlayList(list));
       toast.success(`songs has been added to the Playlist`);

    }
    
  }
  

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

      <div className='grid grid-cols-4 gap-4 relative items-center justify-center'>
        {songs.length > 0 ? (
          <>
            {songs?.map((song, index) => (
              <CardInfo imgUrl={song.imgUrl} key={`songLoop_${song._id}`} type={"album"}
              _id={song._id}
              >
                <p>{song.name}</p>
                <p>{song.artist}</p>
                <SongAttributes song={song} key={index} pushToPlayList={pushToPlayList}/>
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