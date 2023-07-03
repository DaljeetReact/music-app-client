import { useDispatch, useSelector} from 'react-redux'
import { motion } from "framer-motion"
import { RiPlayListLine } from 'react-icons/ri'
import AudioPlayer from 'react-h5-audio-player';
import "react-h5-audio-player/lib/styles.css";
import { setIsSongPlaying, setSongIndex } from '../store/reducers';

function MusicPlayer({setLsPlayListOpen,isPlayListOpen}) {
    const dispatch = useDispatch();
    const { songs, songIndex,currentPlaylist } = useSelector(state => state);
    const currentSongs = currentPlaylist.length > 0?currentPlaylist[songIndex]: songs[songIndex];

    const playNextSong = ()=>{
        let newIndex = 0;
        if((currentPlaylist.length -1 ) > songIndex){
            newIndex = songIndex+1;
        }        
        dispatch(setSongIndex(newIndex));
    }
  
    const playPreviousSong = ()=>{
        let newIndex = 0;
        if( songIndex !== 0){
            newIndex = songIndex-1;
        }else{
            newIndex = currentPlaylist.length -1; // sent to last index
        }
        dispatch(setSongIndex(newIndex));
    }

    if (!currentSongs ) {
        return;
    }  

    const { songUrl, name, artist, album, imgUrl, category, language } = currentSongs;

    return (
        <div className='relative'>
            <div className="w-full flex items-center gap-4 overflow-hidden">
                <div className="w-full items-center gap-3 p-4 flex relative">
                    <img src={imgUrl} alt={name}
                        className='w-40 h-20 object-cover rounded-md'
                    />
                    <div className='flex items-start flex-col'>
                        <p className='text-xl text-headingColor font-semibold'>
                            {name.length > 20 ? name.slice(0.20) : name}
                            <span className='text-base'>{album}</span>
                        </p>
                        <p className='text-textColor'>
                            {artist}  <span className='text-[8px]  text-white font-semibold bg-red-500 p-1 rounded-md'>{category}</span>
                        </p>
                        <motion.i onClick={()=>setLsPlayListOpen(!isPlayListOpen)}>
                            <RiPlayListLine className="text-textColor hover:text-headingColor text-3xl cursor-pointer" />
                        </motion.i>
                    </div>
                    <div className='flex-1'>
                        <AudioPlayer
                            autoPlay={true}
                            src={songUrl}
                            onPlay={(e) =>dispatch(setIsSongPlaying(true))}
                            onClickNext={playNextSong}
                            onClickPrevious={playPreviousSong}
                            onPause={(e)=>dispatch(setIsSongPlaying(false))}
                            showSkipControls={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer