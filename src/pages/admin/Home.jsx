import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const InfoCard = ({name,count,link})=>{
  return(
    <NavLink to={`/dashboard/${link}`}>
      <div className='flex flex-col w-40 h-40 p-4 justify-center align-middle bottom-1 rounded-lg shadow-lg cursor-pointer bg-white hover:scale-110 transition-all ease-in-out text-center'>
        <p className='text-sm font-semibold'>{name}</p>
        <p className='text-xs'>{count}</p>
      </div>
    </NavLink>
  )
}

function Home() {
  const {albums,users,artists,songs} =  useSelector(state => state);

  return (
    <div className='w-full flex align-middle p-4 justify-evenly mt-20 '>
      <InfoCard name={"Users"} count={users?.length} link={"users"}/>
      <InfoCard name={"Songs"}  count={songs?.length} link={"songs"}/>
      <InfoCard name={"Artists"} count={artists?.length} link={"artists"}/>
      <InfoCard name={"Albums"} count={albums?.length} link={"albums"}/>
    </div>
  )
}

export default Home