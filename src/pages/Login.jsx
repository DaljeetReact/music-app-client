import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux'


import { FirebaseApp } from "../config/firebase";
import {LoginBg} from '../assets/video'
import { albumApi, artistApi, songsApi, userApi } from '../utils'
import { setSongs ,setAlbums,setArtists,setAllUserData} from '../store/reducers'

function Login({ setIsLoggedIn, IsLoggedIn }) {
  const firebaseAuthentication = getAuth(FirebaseApp);
  const googleAuthenticationProvide = new GoogleAuthProvider();
  const navigate = useNavigate();


  const dispatch = useDispatch();

  const AllUsers = async () =>{
   await axios.get(`${userApi}/fetch`).then(({data})=>{
      dispatch(setAllUserData(data.data));
    }).catch(e=>console.log(e));
  }

  const AllSongs = async () =>{
    await axios.get(songsApi).then(({data})=>{
      dispatch(setSongs(data.data));
    }).catch(e=>console.log(e));
  }

  const AllArtists = async () =>{
    await axios.get(artistApi).then(({data})=>{
      dispatch(setArtists(data.data));
    }).catch(e=>console.log(e));
  }

  const AllAlbums = async () =>{
    await axios.get(albumApi).then(({data})=>{
      dispatch(setAlbums(data.data));
    }).catch(e=>console.log(e));
  }


  const Authentication = async () => {
    await signInWithPopup(firebaseAuthentication, googleAuthenticationProvide)
      .then((user) => {
        window.localStorage.setItem("auth", true);
        setIsLoggedIn(true);
        navigate("/home");
        AllUsers();
        AllArtists();
        AllAlbums();
        AllSongs();
      })
      .catch((er) => console.log(er));
  };

  useEffect(() => {
    if (IsLoggedIn) {
      navigate("/home");
    }
  },[]);


  return (
    <div className="relative h-vh w-full">
    <video
      src={LoginBg}
      autoPlay muted loop className="w-full h-vh object-cover"
    />
      <di className="absolute inset-0 justify-center flex items-center p-4 bg-darkOverlay">
        <div className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
          <div
            className="flex justify-center items-center flex-row gap-1 bg-cardOverlay cursor-pointer p-2 rounded-md hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
            onClick={Authentication}
          >
            <FcGoogle className="text-xl" />
            <span className="tex-xl">Sign in with Google</span>
          </div>
        </div>
      </di>
    </div>
  );
}

export default Login;
