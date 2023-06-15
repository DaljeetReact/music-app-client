import React from 'react'
import Header from '../Header';
import { Route, Routes } from 'react-router-dom';
import DashBoardMenu from './DashBoardMenu';
import {Home,Users,Songs,Albums,Artists} from './';

function Dashboard() {
  return (
    <div >
     <Header/>
      <div className='w-[75%] m-auto  mt-20'>
        <DashBoardMenu/>
    </div>


      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/users' element={<Users/>} />
        <Route path='/songs' element={<Songs/>} />
        <Route path='/artists' element={<Artists/>} />
        <Route path='/albums' element={<Albums/>} />
      </Routes>
    </div>
  )
}

export default Dashboard;