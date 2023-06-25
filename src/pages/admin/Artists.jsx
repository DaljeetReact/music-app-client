import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { NavLink } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaTrash } from 'react-icons/fa';
import { DeleteFileFromFireStore } from './components';


function Artists() {
  const ArtistInfo = useSelector(state => state.artists);
  const [search, setSearch] = useState("");

  const Card = ({ artist, key }) => {
    const { name, imgUrl, facebook, twitter, instagram, _id } = artist;
    return (
      <motion.div className='overflow-hidden border-2 rounded-lg shadow-lg max-w-[210px] max-h-[210px] flex justify-center items-center flex-col cursor-pointer relative' key={_id}>
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={imgUrl}
          className='h-[150px] w-full object-contain'
        />
        <div className='text-center leading-9 py-4'>
          <p className='font-semibold'>{name}</p>
          <div className='flex gap-4 pb-4'>
            <a href={`https://www.facebook.com/${facebook}`} target='_blank' rel="noreferrer">
              <FaFacebook className='text-blue-500 cursor-pointer' />
            </a>

            <a href={`https://instagram.com/${instagram}`} target='_blank'  rel="noreferrer">
              <FaInstagram className='text-orange-400 cursor-pointer' />
            </a>

            <a href={`https://twitter.com/${twitter}`} target='_blank' rel="noreferrer">
              <FaTwitter className='text-blue-500 cursor-pointer' />
            </a>
          </div>

        </div>
        <DeleteFileFromFireStore url={imgUrl} type={"artist"} id={_id}/>
      </motion.div>
    )
  }

  return (
    <div className='w-[80%] m-auto border-2 mt-20 p-5 shadow-sm rounded-lg'>
      <div className='flex justify-between mb-5 items-center'>
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
            {ArtistInfo?.map((artist, index) => (<Card artist={artist} key={artist._id} />))}
          </>

        ) : (
          <div className='text-center'>No song found</div>
        )}

      </div>
    </div>
  )
}

export default Artists