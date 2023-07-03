import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { RiPlayListAddLine } from 'react-icons/ri';
import axios from 'axios';
import { toast} from 'react-toastify';


import {songsApi} from '../../utils/index'
import CardInfo from './components/CardInfo'
import { AddSongToPlayList } from '../../store/reducers';

function Artists() {
  const { artists} = useSelector(state => state);
  const [search, setSearch] = useState("");
  const [fullArtistDetails, setFullArtistDetails] = useState([]);
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
    (async()=>{
      setisLoading(true);
      setFullArtistDetails([]);
      let data = [];
      // set fullArtistDetails to empty before new push
      for(const artist of artists){
        try{
          let response = await axios.get(`${songsApi}/artist/${artist.name}`);
          data.push({...artist,songsList:response?.data?.data}); //pushing data into array
        }catch(error){
          console.error(`Error fetching data for `, error);
        }
      }
      setFullArtistDetails(data); //set state
      setisLoading(false);
    })();
  }, []);

  

  return (
    <div className='w-[80%] m-auto border-1 border-black mt-20 p-5 shadow-sm rounded-xl relative  backdrop-blur-3xl overflow-hidden '>
    <div className="absolute top-0 bottom-0 left-0 right-0  bg-white opacity-[0.5]"></div>
      <div className='flex justify-between mb-5 items-center relative z-10'>
        <span>Count: <b>{fullArtistDetails.length}</b></span>

        <div className='gap-2 flex '>
          <input type='search' value={search} placeholder='search' className='rounded-full p-2'
            onChange={(e) => setSearch(e.target.value)}
          />
          <NavLink to={"/dashboard/add-song"}>
            <button className='border-0 rounded-full bg-slate-500 p-2 px-4 text-white font-semibold'>Add new</button>
          </NavLink>
        </div>

      </div>

      <div className='grid grid-cols-4 gap-4'>
        {isLoading?(
          <div >Loading.....</div>
        ):fullArtistDetails.length > 0 ? (
          <>
            {fullArtistDetails?.map((artist, index) => (
              <CardInfo imgUrl={artist?.imgUrl} key={`artistLoop_${artist?._id}`} type={"artist"} _id={artist?._id}>
              <p className='font-semibold'>{artist.name}</p>
              <div>Total Songs:{artist?.songsList?.length}</div>
                <div className='flex gap-4 pb-4'>
                  <a href={`https://www.facebook.com/${artist.facebook}`} target='_blank' rel="noreferrer">
                    <FaFacebook className='text-blue-500 cursor-pointer' />
                  </a>

                  <a href={`https://instagram.com/${artist.instagram}`} target='_blank'  rel="noreferrer">
                    <FaInstagram className='text-orange-400 cursor-pointer' />
                  </a>

                  <a href={`https://twitter.com/${artist.twitter}`} target='_blank' rel="noreferrer">
                    <FaTwitter className='text-blue-500 cursor-pointer' />
                  </a>
                </div>
                <SongAttributes song={artist?.songsList}/>
              </CardInfo>
            ))}
          </>

        ) : (
          <div className='text-center'>No Artist found</div>
        )}

      </div>
    </div>
  )
}

export default Artists