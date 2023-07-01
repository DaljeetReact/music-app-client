import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

import CardInfo from './components/CardInfo'

function Artists() {
  const ArtistInfo = useSelector(state => state.artists);
  const [search, setSearch] = useState("");

  return (
    <div className='w-[80%] m-auto border-1 border-black mt-20 p-5 shadow-sm rounded-xl relative  backdrop-blur-3xl overflow-hidden '>
    <div className="absolute top-0 bottom-0 left-0 right-0  bg-white opacity-[0.5]"></div>
      <div className='flex justify-between mb-5 items-center relative z-10'>
        <span>Count: <b>{ArtistInfo.length}</b></span>

        <div className='gap-2 flex '>
          <input type='search' value={search} placeholder='search' className='rounded-full p-2'
            onChange={(e) => setSearch(e.target.value)}
          />
          <NavLink to={"/dashboard/add-song"}>
            <button className='border-0 rounded-full bg-slate-500 p-2 px-4 text-white font-semibold'>Add new</button>
          </NavLink>
        </div>

      </div>

      <div className='grid grid-cols-4 gap-4   '>
        {ArtistInfo.length > 0 ? (
          <>
            {ArtistInfo?.map((artist, index) => (
              <CardInfo imgUrl={artist.imgUrl} key={artist._id} type={"artist"}>
              <p className='font-semibold'>{artist.name}</p>
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