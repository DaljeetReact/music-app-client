import { getAuth } from "firebase/auth";
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

import { ValidateUserLogin } from "./apis";
import { Error404, Home, Login,MusicPlayer } from './pages';
import { Dashboard } from './pages/admin';
import { FirebaseApp } from './config/firebase';
import { setIsSongPlaying, setUserData } from "./store/reducers";

function App() {
  const auth = getAuth(FirebaseApp);
  const checkAuth = false || (window.localStorage.getItem("auth")??false);
  const [IsLoggedIn, setIsLoggedIn] = useState(checkAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSongPlaying =   useSelector((state)=>state.isSongPlaying);
 
  useEffect(() => {   
    if(!IsLoggedIn){ 
      //if not logged in then it will redirect user to login page 
      navigate("/login");
      return;
    }
    CheckAuthState();
    dispatch(setIsSongPlaying(true));
  },[]);

  const CheckAuthState =  async () =>{
    //onAuthStateChanged is firebase method, it will trigger whenever the state will change
   await auth.onAuthStateChanged((user) => { 
      if (user?.emailVerified) {
        user.getIdToken().then((token) => {
          ValidateUserLogin(token).then(({data})=>{
            if(data !== undefined){
              dispatch(setUserData(data.data));
            }
           
          }).catch(e=>console.log(e));
        })
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        window.localStorage.setItem("auth", false);
        navigate("/login");
      }
    });
  }

  return (
    <AnimatePresence mode='wait'>
      <div className={`min-w-[680px] h-vh  pb-[100px]`}>
      <div className="bg-[url('./assets/img/as.jpg')] bg-cover bg-no-repeat bg-fixed fixed top-0 bottom-0 right-0 left-0 z-[-1]"></div>
        <Routes>
          <Route exact path="/" 
           render={() => {
                    return (
                      IsLoggedIn?
                      <Navigate to="/home" replace={true} /> :
                      <Navigate to="/login"  replace={true} /> 
                    )
                }}
           />
          <Route path='/home' element={<Home IsLoggedIn={IsLoggedIn} />} />
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} IsLoggedIn={IsLoggedIn} />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
          {(isSongPlaying && IsLoggedIn)&&(
            <motion.div
              initial={{opacity:0,y:50}}
              animate={{opacity:1,y:0}}
              className="fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md items-center justify-center"
            >
              <MusicPlayer/> 
            </motion.div>
          )}
      </div>
    </AnimatePresence>
  );
}

export default App;
