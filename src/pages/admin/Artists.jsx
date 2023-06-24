import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { NavLink } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaTrash } from 'react-icons/fa';


function Artists() {

  const ArtistInfo = useSelector(state => state.artists);
  const [search, setSearch] = useState("");

  const DeleteFileFromFireStore = ({url,type,id}) =>{
    const [isDelete, setisDelete] = useState(false);

    const DeleteFile = async()=>{

    }
     return(
      <motion.div 
        className={`${isDelete&&"absolute backdrop-blur-2xl top-0 right-0 bottom-0 left-0 rounded-lg p-4"} `}>
        <div>
          {isDelete?(
            <motion.div
             className='text-center'>
              <p> Are you sure you want to delete this {type} ? </p>
                <div className='flex gap-4 mt-3 justify-center'>
                    <motion.div
                      onClick={DeleteFile}
                      whileTap={{ scale: 0.8 }}
                      className="cursor-pointer bg-red-500 px-3 w-min-[20px] text-sm rounded-md shadow-sm">
                        Yes
                    </motion.div>

                    <motion.div 
                     whileTap={{ scale: 0.8 }}
                     onClick={()=>setisDelete(false)}
                     className="cursor-pointer bg-gray-500 px-3 w-min-[20px] text-sm rounded-md shadow-sm">
                        No
                    </motion.div>
                </div>
            </motion.div>
          ):(
              <span className="w-8 h-8 absolute top-2 right-2 rounded-full bg-red-500 flex justify-center items-center"> 
                  <FaTrash onClick={()=>setisDelete(true)} className=' backdrop-blur-sm text-white' />
              </span>
          )}
        </div>
       
      </motion.div>
     )
  }

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

            <a href={`https://www.facebook.com/${facebook}`} target='_blank'  rel="noreferrer">
              <FaInstagram className='text-orange-400 cursor-pointer' />
            </a>

            <a href={`https://www.facebook.com/${facebook}`} target='_blank' rel="noreferrer">
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