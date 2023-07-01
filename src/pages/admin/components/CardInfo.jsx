import React from 'react'
import {motion} from "framer-motion";
import { useSelector } from 'react-redux';
import { DeleteFileFromFireStore } from '../components';

function CardInfo({imgUrl,_id,type,children}) {
    const role =  useSelector(state=>state.user?.role);
  return (
    <motion.div className='overflow-hidden border-1 bg-white rounded-lg shadow-lg max-w-[210px] max-h-auto flex justify-center  items-center flex-col cursor-pointer relative' key={_id}>
        <motion.img 
          whileHover={{scale:1.05,borderBottomLeftRadius:'20px',borderBottomRightRadius:'20px'}}
          src={imgUrl}
          className='h-[230px] w-full object-cover rounded-b-lg'
        />
        <div className='text-center leading-9 py-4'>
          {children}
        </div>
        {role==="admin"&&(
          <DeleteFileFromFireStore url={imgUrl} type={type} id={_id}/>
        )}
    </motion.div>
  )
}

export default CardInfo;