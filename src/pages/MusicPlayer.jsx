import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from "framer-motion"
import { RiPlayListLine } from 'react-icons/ri'
import AudioPlayer from 'react-h5-audio-player';
import "react-h5-audio-player/lib/styles.css";
function MusicPlayer() {

    const { songs, isSongPlaying, songIndex } = useSelector(state => state);
    const currentSongs = songs[songIndex];
    if (!currentSongs) {
        return;
    }   

    const { songUrl, name, artist, album, imgUrl, category, language } = currentSongs;

    return (
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
                    <motion.i>
                        <RiPlayListLine className="text-textColor hover:text-headingColor text-3xl cursor-pointer" />
                    </motion.i>
                </div>
                <div className='flex-1'>
                    <AudioPlayer
                        autoPlay={true}
                        src={songUrl}
                        onPlay={e => console.log("onPlay")}
                        showSkipControls={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer