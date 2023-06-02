 import React,{useEffect} from 'react'
 import {FcGoogle} from 'react-icons/fc'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';

 import {FirebaseApp} from '../config/firebase'
import { useNavigate } from 'react-router-dom';
 function Login({setIsLoggedIn,IsLoggedIn}) {
  
  const firebaseAuthentication = getAuth(FirebaseApp);
  const googleAuthenticationProvide =  new GoogleAuthProvider();
  const navigate =  useNavigate();
  const Authentication= async ()=>{
    await signInWithPopup(firebaseAuthentication,googleAuthenticationProvide).then((user)=>{
      console.log({user});
      window.localStorage.setItem("auth",true);
      setIsLoggedIn(true);
      navigate("/home")
    }).catch(er=>console.log(er));
  }

  useEffect(() => {
    if(IsLoggedIn){
      navigate("/home");
    }
  }, [])
  
   return (
     <div className='relative h-screen w-screen' >
        <di className='absolute inset-0 justify-center flex items-center p-4 bg-darkOverlay'>
          <div className='w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center'>
            <div className='flex justify-center items-center flex-row gap-1 bg-cardOverlay cursor-pointer p-2 rounded-md hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all' onClick={Authentication}>
              <FcGoogle className='text-xl'/>  
              <span className='tex-xl'>Sign in with Google</span>
            </div>
          </div>

        </di>
     </div>
   )
 }
 
 export default Login