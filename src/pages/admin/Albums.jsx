import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import CardInfo from "./components/CardInfo"
import axios from 'axios';

import { songsApi } from '../../utils/index'


function Albums() {

  const albumsInfo = useSelector(state => state.albums);
  const [search, setSearch] = useState("");
  const [fullAlbumDetails, setFullAlbumDetails] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    //self Calling async function
    (async () => {
      setisLoading(true);
      setFullAlbumDetails([]);
      let data = [];
      // set fullArtistDetails to empty before new push
      for (const album of albumsInfo) {
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
        <span>Count: <b>{albumsInfo.length}</b></span>

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