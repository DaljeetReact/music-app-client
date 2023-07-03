import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RiPlayListAddLine } from 'react-icons/ri';
import axios from 'axios';


import CardInfo from "./components/CardInfo"
import { songsApi } from '../../utils/index'
import { AddSongToPlayList } from '../../store/reducers';
import { toast } from 'react-toastify';


function Albums() {

  const {albums} = useSelector(state => state);
  const [search, setSearch] = useState("");
  const [fullAlbumDetails, setFullAlbumDetails] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const dispatch =  useDispatch();
 
  const pushToPlayList = (songList)=>{
    dispatch(AddSongToPlayList(songList));
    toast.info(`${songList?.length} songs has been added to the list`);
  }


  const SongAttributes = ({song})=>{
    return(
      <div className='absolute top-2 left-1 flex flex-col gap-1' key={`list-atrr${song._id}`}>
        <span className='w-8 h-8 rounded-full bg-red-500 flex justify-center items-center shadow-md'
          onClick={()=>pushToPlayList(song)}
        >
           <RiPlayListAddLine className='text-white' />
        </span>
      </div>
    )
  }

  useEffect(() => {
    //self Calling async function
    (async () => {
      setisLoading(true);
      setFullAlbumDetails([]);
      let data = [];
      // set fullArtistDetails to empty before new push
      for (const album of albums) {
        try {
          let response = await axios.get(`${songsApi}/album/${album.name}`);
          data.push({ ...album, songsList: response?.data?.data }); //pushing data into array
        } catch (error) {
          console.error(`Error fetching data for `, error);
        }
      }
      setFullAlbumDetails(data); //set State
      setisLoading(false);

    })();
  }, []);

  return (
    <div className='w-[80%] m-auto border-1 border-black mt-20 p-5 shadow-sm rounded-xl relative  backdrop-blur-3xl overflow-hidden '>
      <div className="absolute top-0 bottom-0 left-0 right-0  bg-white opacity-[0.5]"></div>
      <div className='flex justify-between mb-5 items-center relative z-10'>
        <span>Count: <b>{fullAlbumDetails.length}</b></span>

        <div className='gap-2 flex '>
          <input type='search' value={search} placeholder='search' className='rounded-full p-2'
            onChange={(e) => setSearch(e.target.value)}
          />
          <NavLink to={"/dashboard/add-song"}>
            <button className='border-0 rounded-full bg-slate-500 p-2 px-4 text-white font-semibold'>Add new</button>
          </NavLink>
        </div>

      </div>

      <div className='grid grid-cols-4 gap-4 justify-center items-center '>
        {isLoading ? (
          <div>Loading...</div>
        ) : (fullAlbumDetails.length > 0) ? (
          <>
            {fullAlbumDetails?.map((album, index) => (
              <CardInfo imgUrl={album.imgUrl} key={`albumLoop_${album._id}`} type={"album"} _id={album._id}>
                <h3>{album.name}</h3>
                <div >Total songs:{album?.songsList?.length}</div>
                <SongAttributes song={album?.songsList}/>
              </CardInfo>
            ))}
          </>

        ) : (
          <div className='text-center'>No Album found</div>
        )}

      </div>
    </div>
  );
}

export default Albums