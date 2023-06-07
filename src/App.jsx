import { getAuth } from "firebase/auth";
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';


import { Home, Login } from './componets';
import { FirebaseApp } from './config/firebase';
import { ValidateUserLogin } from "./apis";
function App() {
  const auth = getAuth(FirebaseApp);
  const checkAuth = false || (window.localStorage.getItem("auth")??false);
  const [IsLoggedIn, setIsLoggedIn] = useState(checkAuth);
  const navigate = useNavigate();
 
  useEffect(() => {   
    if(!IsLoggedIn){ 
      //if not logged in then it will redirect user to login page 
      navigate("/login");
      return;
    }
    CheckAuthState();
    console.log(" i am called");
  });

  const CheckAuthState =  async () =>{
    //onAuthStateChanged is firebase method, it will trigger whenever the state will change
   await auth.onAuthStateChanged((user) => { 
      if (user.emailVerified) {
        user.getIdToken().then((token) => {
          ValidateUserLogin(token).then(({data})=>{
            console.log({data});
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
      <div className="min-w-[680px] h-auto bg-primary flex items-center">
        <Routes>
          <Route path='/home' element={<Home IsLoggedIn={IsLoggedIn} />} />
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} IsLoggedIn={IsLoggedIn} />} />
          <Route path='/*' element={<Home />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default App;
