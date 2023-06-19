import { getAuth } from "firebase/auth";
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';


import { ValidateUserLogin } from "./apis";
import { Error404, Home, Login } from './componets';
import { Dashboard } from './componets/admin';
import { FirebaseApp } from './config/firebase';
import { setUserData } from "./store/reducers";
function App() {
  const auth = getAuth(FirebaseApp);
  const checkAuth = false || (window.localStorage.getItem("auth")??false);
  const [IsLoggedIn, setIsLoggedIn] = useState(checkAuth);
  const navigate = useNavigate();

  const dispatch = useDispatch()

 
  useEffect(() => {   
    if(!IsLoggedIn){ 
      //if not logged in then it will redirect user to login page 
      navigate("/login");
      return;
    }
    CheckAuthState();
    console.log(" i am called");
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
      <div className="min-w-[680px] h-screen bg-primary">
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
      </div>
    </AnimatePresence>
  );
}

export default App;
