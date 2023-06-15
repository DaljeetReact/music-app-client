import { getAuth } from "firebase/auth";
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate,Navigate } from 'react-router-dom';


import { ValidateUserLogin } from "./apis";
import { Home, Login } from './componets';
import { Home as DashboardHome, Songs ,Dashboard,Users } from './componets/admin';
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
      <div className="min-w-[680px] h-auto bg-primary">
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
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default App;
