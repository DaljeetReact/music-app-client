import React from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';


import Header from './Header'
import CardInfo from './admin/components/CardInfo';
import { SongAttributes } from './admin/components';
import { AddSongToPlayList } from '../store/reducers';
import { responsiveSettings } from './admin';

function Music() {
    const { songs, currentPlaylist,albums,artists } = useSelector(state => state);
    const dispatch = useDispatch();

    const pushToPlayList = (song) => {
        let list = [...currentPlaylist];
        let found = Object.values(list).find((obj) => {
            return obj._id === song._id
        });
        if (!found) {
            list.push(song);
            dispatch(AddSongToPlayList(list));
            toast.success(`songs has been added to the Playlist`);
        }
    }
    return (
        <div>
            <Header />
            <div className='w-[80%] m-auto  my-8'>
                <h2 className='text-white text-center text-3xl font-semibold'>All Songs</h2>
                <div className='mt-6 mb-10'>
                    <Slide responsive={responsiveSettings} pauseOnHover={true} cssClass={"mt-6 rounded-lg"}>

                        {songs?.map((song, index) => (
                            <CardInfo imgUrl={song.imgUrl} key={`songLoopFilters_${song._id}`} type={"album"}
                                _id={song._id}
                            >
                                <p>{song.name}</p>
                                <p>{song.artist}</p>
                                <SongAttributes song={song} key={index} pushToPlayList={pushToPlayList} />
                            </CardInfo>
                        ))}
                    </Slide>
                </div>

                <h2 className='text-white text-center text-3xl font-semibold'>All Artist</h2>
                <div className='mt-6 mb-10'>
                    <Slide responsive={responsiveSettings} pauseOnHover={true} cssClass={"mt-6 rounded-lg"}>

                        {artists?.map((artist, index) => (
                            <CardInfo imgUrl={artist.imgUrl} key={`songLoopFilters_${artist._id}`} type={"artist"}
                                _id={artist._id}
                            >
                                <p>{artist.name}</p>
                                <div className='flex gap-4 pb-4'>
                                    <a href={`https://www.facebook.com/${artist.facebook}`} target='_blank' rel="noreferrer">
                                        <FaFacebook className='text-blue-500 cursor-pointer' />
                                    </a>

                                    <a href={`https://instagram.com/${artist.instagram}`} target='_blank'  rel="noreferrer">
                                        <FaInstagram className='text-orange-400 cursor-pointer' />
                                    </a>

                                    <a href={`https://twitter.com/${artist.twitter}`} target='_blank' rel="noreferrer">
                                        <FaTwitter className='text-blue-500 cursor-pointer' />
                                    </a>
                                </div>    
                            </CardInfo>
                        ))}
                    </Slide>
                </div>


                <h2 className='text-white text-center text-3xl font-semibold'>All Albums</h2>
                <div className='mt-6'>
                    <Slide responsive={responsiveSettings} pauseOnHover={true} cssClass={"mt-6 rounded-lg"}>

                        {albums?.map((album, index) => (
                            <CardInfo imgUrl={album.imgUrl} key={`songLoopFilters_${album._id}`} type={"album"}
                                _id={album._id}
                            >
                               <h3>{album.name}</h3>
                            </CardInfo>
                        ))}
                    </Slide>
                </div>

            </div>
        </div>
    )
}

export default Music