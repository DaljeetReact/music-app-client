import React from 'react'
import { error404 } from '../assets/img'

function Error404() {
  return (
    <div className='flex w-full h-auto  justify-center items-center px-5 flex-col'>
        <img src={error404} alt='404' className='w-52' />
        <h5 className=' font-bold text-lg text-center'> Not Found</h5>

    </div>
  )
}

export default Error404