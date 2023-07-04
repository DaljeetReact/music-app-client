import { useState,useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {RiFilter2Line} from "react-icons/ri"
import {AiOutlineClear} from "react-icons/ai"


import { DropDown, SongAttributes } from './admin/components';
import { AddSongToPlayList, resetFilters } from '../store/reducers';
import CardInfo from './admin/components/CardInfo';
import SearchBar from './SearchBar'
import {Header} from './index'
import { Categories, languages,filtersInit } from "./admin/index";


function Home() {
  const  {filters,songs,currentPlaylist,artists,albums} = useSelector(state=>state);
  const dispatch = useDispatch();

  const [SearchTerm, setSearchTerm] = useState("");
  const [Filters, SetFilters] = useState(filters);
  const [filterSongs, setFilterSongs] = useState(songs);
  const [isFiltersApplyed, setisFiltersApplyed] = useState(false);

  const pushToPlayList = (song)=>{
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
  const responsiveSettings = [
    {
        breakpoint: 800,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 4
        }
    },
    {
        breakpoint: 500,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2
        }
    }
];

const clearFilters = () =>{
  dispatch(resetFilters(filtersInit)) 
  SetFilters(filtersInit);
  setisFiltersApplyed(false);
  setFilterSongs(songs);
} 

const ApplyFilters = ()=>{
  setisFiltersApplyed(true);
  //adding conditions 
  if(filtersInit === Filters){
    //here the filters are empty
    return;
  }
  let filters =  songs.filter(function(song) {
    return (
            ((Filters.Artist.length > 0) && (song.artist.toLowerCase().includes(Filters.Artist.toLowerCase())))     ||
            ((Filters.Album.length > 0 ) && (song.album.toLowerCase().includes(Filters.Album.toLowerCase())))       ||
            ((Filters.Category.length > 0 ) && (song.category.toLowerCase().includes(Filters.Category.toLowerCase()))) ||
            ((Filters.Language.length > 0 ) && (song.language.toLowerCase().includes(Filters.Language.toLowerCase())))
            );
  });
  setFilterSongs(filters);
}

useEffect(() => {
  if(SearchTerm.length > 0 ){
    let filters =  songs.filter(function(song) {
      return (
              (song.name.toLowerCase().includes(SearchTerm.toLowerCase()))   || 
              (song.artist.toLowerCase().includes(SearchTerm.toLowerCase())) ||
              (song.album.toLowerCase().includes(SearchTerm.toLowerCase())) 
              );
    });
    setFilterSongs(filters);
  }else{
    setFilterSongs(songs);
  }
}, [SearchTerm]);



  return (
    <div>
    <Header/>
    <SearchBar SearchTerm={SearchTerm} setSearchTerm={setSearchTerm}/>
    
      {SearchTerm.length > 0 &&(
        <div className='py-5'>
          <div className='font-semibold text-center text-sm'>Searching for:{SearchTerm}</div>
          <div className='font-semibold text-center text-sm'>Total found:{filterSongs.length}</div>
        </div>
      )}
    <div className='w-[80%] m-auto  my-8'>
      <div className='font-semibold text-center text-sm text-white'>
      Choose Filter
      </div>
      <div className='flex gap-4 items-center mt-5 justify-center'>
        <DropDown name={"Artist"} dataInfo={artists} setFilters={SetFilters} Filters={Filters} />
        <DropDown name={"Album"} dataInfo={albums} setFilters={SetFilters} Filters={Filters} />
        <DropDown name={"Language"} dataInfo={languages} setFilters={SetFilters} Filters={Filters} />
        <DropDown name={"Category"} dataInfo={Categories} setFilters={SetFilters} Filters={Filters} />
        <div className='flex gap-2'>
          <div className='flex justify-center items-center  border-1 w-[40px] h-[47px] bg-white rounded-md'
          onClick={ApplyFilters}
          >
            <RiFilter2Line className='text-3xl text-red-500'/>
          </div>
          <div className='flex justify-center items-center  border-1 w-[40px] h-[47px] bg-white rounded-md' 
            onClick={clearFilters}
          >
            <AiOutlineClear className='text-3xl text-red-500'/>
          </div>
        </div>
      </div>
      {(SearchTerm.length > 0 || isFiltersApplyed)?(
        <div className='grid grid-cols-4 gap-4 relative items-center justify-center mt-6'>
           {filterSongs?.map((song, index) => (
                <CardInfo imgUrl={song.imgUrl} key={`songLoopFilters_${song._id}`} type={"album"}
                _id={song._id}
                >
                  <p>{song.name}</p>
                  <p>{song.artist}</p>
                  <SongAttributes song={song} key={index} pushToPlayList={pushToPlayList}/>
                </CardInfo>
              ))}
        </div>
      ):(
        <>
        {filterSongs.length > 0 ? (
          <Slide  responsive={responsiveSettings} pauseOnHover={true} cssClass={"mt-6 rounded-lg"}>
              {filterSongs?.map((song, index) => (
                <CardInfo imgUrl={song.imgUrl} key={`songLoopSlides_${song._id}`} type={"album"}
                _id={song._id}
                >
                  <p>{song.name}</p>
                  <p>{song.artist}</p>
                  <SongAttributes song={song} key={index} pushToPlayList={pushToPlayList}/>
                </CardInfo>
              ))}
            </Slide>

          ) : (
            <div className='text-center'>No song found</div>
          )}
        </>
      )}
    </div>
    
    </div>
  )
}

export default Home