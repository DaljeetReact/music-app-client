import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { toast} from 'react-toastify';


import { FirebaseApp } from "../config/firebase";
import {LoginBg} from '../assets/video'
import { albumApi, artistApi, songsApi, userApi } from '../utils'
import { setSongs ,setAlbums,setArtists,setAllUserData,setAuth} from '../store/reducers'
import { ValidateUserLogin } from "../apis";

import { setUserData } from "../store/reducers";


function Login() {;

  const firebaseAuthentication = getAuth(FirebaseApp);
  const googleAuthenticationProvide = new GoogleAuthProvider();
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

 

  const Authentication = async () => {
    await signInWithPopup(firebaseAuthentication, googleAuthenticationProvide)
      .then((user) => {
        CheckAuthState();
      })
      .catch((er) =>toast.error(`Authentication error`));
  };

  const CheckAuthState =  async () =>{
    //onAuthStateChanged is firebase method, it will trigger whenever the state will change
   await firebaseAuthentication.onAuthStateChanged((user) => { 
      if (user?.emailVerified) {
        user.getIdToken().then((token) => {
          ValidateUserLogin(token).then(({data})=>{
            if(data !== undefined){
              window.localStorage.setItem("auth", true);
              //Dispatch 
              dispatch(setUserData(data.data));
              dispatch(setAuth(true));
              navigate("/home");
              toast.success(`Welcome ${user.displayName} to Music App`);
            }
           
          }).catch(e=>toast.error(`Something went wrong while authenticate`));
        });
       
      } else {
        window.localStorage.setItem("auth", false);
        navigate("/login");
      }
    });
    
  }


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
