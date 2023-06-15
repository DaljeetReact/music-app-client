import React from 'react'
import { NavLink } from 'react-router-dom'

import { isActiveClass, isNonActiveClasas } from '../../utils/styles';

function DashBoardMenu() {

    const addActiveClass = ({ isActive }) => {
        return isActive ? isActiveClass : isNonActiveClasas
      }

      
  return (
    <ul className=' flex justify-evenly align-middle' >
        <li><NavLink className={addActiveClass} to={"/dashboard/home"}>Home</NavLink> </li>
        <li><NavLink className={addActiveClass} to={"/dashboard/users"}>Users</NavLink></li>
        <li><NavLink className={addActiveClass} to={"/dashboard/songs"}>Songs</NavLink></li>
        <li><NavLink className={addActiveClass} to={"/dashboard/artists"}>Artists</NavLink></li>
        <li><NavLink className={addActiveClass} to={"/dashboard/albums"}>Albums</NavLink></li>
    </ul>
  )
}

export default DashBoardMenu