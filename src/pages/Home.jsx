import React, { useEffect } from 'react'
import {Header} from './index'
import axios from 'axios'
import { albumApi, artistApi, songsApi, userApi } from '../utils'
import { useDispatch } from 'react-redux'
import { setSongs ,setAlbums,setArtists,setAllUserData} from '../store/reducers'
function Home({IsLoggedIn}) {


  return (
    <div>
    <Header/>
    
    
    </div>
  )
}

export default Home