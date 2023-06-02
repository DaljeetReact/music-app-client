import {useEffect, useState} from 'react'
import {Route,Routes, useNavigate} from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Login,Home } from './componets';

import { FirebaseApp } from './config/firebase';
function App() {
  const auth = getAuth(FirebaseApp);
  const checkAuth = false || window.localStorage.getItem("auth");
  const [IsLoggedIn, setIsLoggedIn] = useState(checkAuth);
  const navigate = useNavigate();
  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((token)=>{
          console.log({token});
        })
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        window.localStorage.setItem("auth",false);
        navigate("/login");
      }
    });
  },[])
  
  return (
    <div className="wc-screen h-screen bg-blue-200 flex justify-center items-center">
      <Routes>
        <Route  path='/home' element={<Home IsLoggedIn={IsLoggedIn}/>}/>
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} IsLoggedIn={IsLoggedIn}/>} />
        <Route path='/*' element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
