import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

import { Categories, languages ,filtersInit } from "./index";
import { DropDown, FileUploadComponent,ObjectValidator } from "./components/index.jsx";
import { songsApi } from '../../utils';
import AddArtist from './components/AddArtist';
import AddAlbum from './components/AddAlbum';
import { pushNewSong } from '../../store/reducers';

function NewSong() {
  const { artists, albums ,filters } = useSelector(state => state);
  const dispatch = useDispatch();

  const [IsLoading, setIsLoading] = useState(false);
  // Song uploading Form Data
  const [songName, setsongName] = useState("");
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [uploadedAudioURL, setUploadedAudioURL] = useState(null);
  const [Filters, SetFilters] = useState(filters);
  // Song uploading Form Data

  const handleUploadingSong =  async ()=>{
    setIsLoading(true);
    // Validation
    let data = {
        "name":songName,
        "imgUrl":uploadedImageURL,
        "songUrl":uploadedAudioURL,
        "album":Filters.Album,
        "artist":Filters.Artist,
        "language":Filters.Language,
        "category":Filters.Category
    };
    
    const  validationErrors = ObjectValidator(data);

    if(validationErrors.length > 0){
     
      validationErrors.forEach(val=>{
        let errmsg =`Please add the value for ${val} \n`; 
        toast.error(errmsg);
      })
      
      setIsLoading(false);
      return false;
    }
    
   await axios.post(`${songsApi}`,data).then(({data})=>{
      if(data.status === 201){
        resetSongForm();
        dispatch(pushNewSong(data.Song));
        toast.success("Song Has bee Successfully uploaded ");
      }
    }).catch(e=>console.log(e)).finally(()=>{
        setIsLoading(false);
    })
    //Saving song
  }

  const resetSongForm = ()=>{
    setUploadedAudioURL(null);
    setsongName("");
    setUploadedImageURL(null);
    SetFilters(filtersInit);
  }

  useEffect(()=>{
    // Setting up global filters value if page get refreshed
    SetFilters(prv=>({
      ...prv,
      filters
    }));
  },[])



  return (
    <div className='w-full m-auto border-2 mt-20 p-5 shadow-sm rounded-lg flex justify-between gap-4  backdrop-blur-xl'>
      <div className='border-2 p-5 shadow-sm rounded-lg flex-1'>
        <div className="text-center font-semibold text-2xl text-gray-500 py-3">Song</div>
        <div>
          <input type='text' placeholder='song name' value={songName}
            onChange={(e) => setsongName(e.target.value)}
            className='p-3 bg-white rounded-lg w-full' />
        </div>

        <div className='flex justify-between items-center mt-5'>
          <DropDown name={"Artist"} dataInfo={artists} setFilters={SetFilters} Filters={Filters} />
          <DropDown name={"Album"} dataInfo={albums} setFilters={SetFilters} Filters={Filters} />
          <DropDown name={"Language"} dataInfo={languages} setFilters={SetFilters} Filters={Filters} />
          <DropDown name={"Category"} dataInfo={Categories} setFilters={SetFilters} Filters={Filters} />
        </div>

        <FileUploadComponent uploadType={"image"} uploadPAth={"songs/Images"} uploadedFileURL={uploadedImageURL} setUploadedFileURL={setUploadedImageURL} />

        <FileUploadComponent uploadType={"audio"} uploadPAth={"songs/Audio"} uploadedFileURL={uploadedAudioURL} setUploadedFileURL={setUploadedAudioURL} />
      
        <div className="mt-5 text-center p-4">
          
          <button  type="button" class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center" 
            onClick={handleUploadingSong}
            disabled={IsLoading?true:false}
          >
          {IsLoading&&(
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
            </svg>
          )}
           {IsLoading?"Uploading":"Save Song"} 
          </button>
        </div>

      </div>

      <div className="flex-2">
            <div className="flex gap-4 flex-col h-full">
                <div className='border-2 p-5 shadow-sm rounded-lg h-full'>
                    <div className="text-center font-semibold text-2xl text-gray-500 py-3 ">Artist</div>
                    <AddArtist/>
                </div>

                <div className='border-2 p-5 shadow-sm rounded-lg h-full'>  
                    <div className="text-center font-semibold text-2xl text-gray-500 py-3 ">Album</div>
                    <AddAlbum/>
                </div>
            </div>
            
      </div>
    </div>
  )
}

export default NewSong