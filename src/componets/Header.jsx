import { NavLink } from 'react-router-dom'

import {isActiveClass,isNonActiveClasas} from '../utils/styles';
import {Logo} from '../assets/img'
function Header() {
    const addActiveClass=({isActive})=>{
        return isActive?isActiveClass:isNonActiveClasas
    }
  return (
    <header className='flex items-center w-full p-4  md:py-2 md:px-6 justify-between' >

        <NavLink to={"/"} >
            <img src={Logo} alt='app-logo' className='w-16'/>
        </NavLink>

       <ul className='flex items-center justify-center ml-7'>
            <li className='mx-5 text-lg'> <NavLink to={"/home"} className={addActiveClass}>Home</NavLink></li>
            <li className='mx-5 text-lg'> <NavLink to={"/premium"} className={addActiveClass}>Premium</NavLink></li>
            <li className='mx-5 text-lg'> <NavLink to={"/musics"} className={addActiveClass}>Musics</NavLink></li>
            <li className='mx-5 text-lg'> <NavLink to={"/contact-us"} className={addActiveClass}>Contact Us</NavLink></li>
       </ul>

    </header>
  )
}

export default Header