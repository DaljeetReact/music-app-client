import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { FaCrown } from 'react-icons/fa';
import { motion } from "framer-motion"
import {getAuth} from 'firebase/auth'
import { FirebaseApp } from '../config/firebase';
import { MenuItems, isActiveClass, isNonActiveClasas } from '../utils/styles';
import { Logo } from '../assets/img'
function Header() {
  const [isMenu, setIsMenu] = useState(false);

  const FireAuth = getAuth(FirebaseApp);
  const {name,imgUrl,role} =  useSelector(state=>state.user);

  const addActiveClass = ({ isActive }) => {
    return isActive ? isActiveClass : isNonActiveClasas
  }

  const navigator = useNavigate();

  const Logout = () =>{
    FireAuth.signOut().then(()=>{
      window.localStorage.setItem('auth',false);
    }).catch(e=>console.log(e));
    navigator("/login",{replace:true})
  }

  return (
    <header className='flex items-center w-full p-4  md:py-2 md:px-6 justify-between' >
      <div className='flex'>
        <NavLink to={"/"} >
          <img src={Logo} referrerPolicy="no-referrer" alt='app-logo' className='w-16' />
        </NavLink>

        <ul className='flex items-center justify-center ml-7'>
          <li className='mx-5 text-lg'> <NavLink to={"/home"} className={addActiveClass}>Home</NavLink></li>
          <li className='mx-5 text-lg'> <NavLink to={"/premium"} className={addActiveClass}>Premium</NavLink></li>
          <li className='mx-5 text-lg'> <NavLink to={"/musics"} className={addActiveClass}>Musics</NavLink></li>
          <li className='mx-5 text-lg'> <NavLink to={"/contact-us"} className={addActiveClass}>Contact Us</NavLink></li>
        </ul>
      </div>

    <div className='flex items-center gap-2 relative bottom-2'
      onMouseEnter={()=>setIsMenu(true)}
      onMouseLeave={()=>setIsMenu(false)}
    >
      <img src={imgUrl} referrerPolicy="no-referrer" alt={name} className='w-11 rounded-full'/>

      <div className='flex flex-col gap-1 cursor-pointer'>
          <div className='text-lg font-semibold hover:text-headingColor text-textColor'>{name}</div>
          <div className='flex text-xs text-gray-500 gap-2'>Premium Member <FaCrown className=' text-orange-400'/></div>
      </div>
      {isMenu&&(
        <motion.div 
          initial={{ opacity: 0,y:50 }}
          animate={{ opacity: 1,y:0 }}
          exit={{ opacity: 0,y:50 }}
        className='menu absolute  top-12 z-20 right-0 w-80  bg-white rounded-md shadow-lg p-4'>
            <ul>
              <li className={MenuItems}><NavLink to={"/profile"}>Profile</NavLink></li>
              <li className={MenuItems}><NavLink to={"/my-favorites"}>My Favorites</NavLink></li>
              {role==="admin"&&( 
                <li className={MenuItems}><NavLink to={"/dashboard/home"}>Dashboard</NavLink></li>
              )}
              <li className={[MenuItems,'border-t-5 border-gray-900 mt-3']} onClick={Logout}>Sign Out</li>
            </ul>
        </motion.div>
      )}
    </div>      
      
    </header>
  )
}

export default Header