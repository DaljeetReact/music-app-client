import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";
// Adding Toster notification
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Error404, Home, Login,MusicPlayer,PlayList,Music } from './pages';
import { Dashboard } from './pages/admin';

function App() {

  const hidePlayerIfPage = ["/dashboard/add-song"];

  const [isPlayListOpen, setLsPlayListOpen] = useState(false);

  const {auth} =  useSelector(state=>state);

  const location = useLocation();

  const hidePlayer =  !hidePlayerIfPage.includes(location.pathname);
  
  return (
    <AnimatePresence mode='wait'>
      <div className={`min-w-[680px] h-vh  pb-[100px]`}>
      <div className="bg-[url('./assets/img/as.jpg')] bg-cover bg-no-repeat bg-fixed fixed top-0 bottom-0 right-0 left-0 z-[-1]"></div>
        <Routes>
          <Route exact path="/" 
          element={auth? <Navigate to="/home" replace={true} /> :<Navigate to="/login"  replace={true} /> }

           />
          <Route path='/home' element={<Home />} />
          <Route path='/music' element={<Music />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
          {(auth && hidePlayer)&&(
            <motion.div
              initial={{opacity:0,y:50}}
              animate={{opacity:1,y:0}}
              className="fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md items-center justify-center"
            >
              <MusicPlayer isPlayListOpen={isPlayListOpen} setLsPlayListOpen={setLsPlayListOpen}/> 
            </motion.div>
          )}

           {(isPlayListOpen && auth)&&(
              <PlayList setLsPlayListOpen={setLsPlayListOpen} isPlayListOpen={isPlayListOpen}/>
            )}
      </div>
      <ToastContainer/>
    </AnimatePresence>
  );
}

export default App;
