import React from 'react'
import Header from '../Header';
import { Route, Routes } from 'react-router-dom';
import DashBoardMenu from './DashBoardMenu';
import {Home,Users,Songs,Albums,Artists, NewSong} from '.';
import Error404 from '../Error404';

function Dashboard() {
  return (
    <div className='pb-20 px-4'>
     <Header/>
      <div className='w-[75%] m-auto  mt-20'>
        <DashBoardMenu/>
      </div>

      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/users' element={<Users/>} />
        <Route path='/songs' element={<Songs/>} />
        <Route path='/add-song' element={<NewSong/>} />
        <Route path='/artists' element={<Artists/>} />
        <Route path='/albums' element={<Albums/>} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default Dashboard;