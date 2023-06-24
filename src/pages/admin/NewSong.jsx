import { ref, deleteObject } from "firebase/storage";
import { useState } from 'react';
import { useSelector } from 'react-redux';


import { storage } from "../../config/firebase.js";
import { Categories, languages } from "./index";
import {DropDown,FileUploadComponent} from "./components/index.jsx";

function NewSong() {
  const { artists, albums} = useSelector(state => state);
  // Song uploading Form Data
  const [songName, setsongName] = useState("");
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [uploadedAudioURL, setUploadedAudioURL] = useState(null);
  const [Filters, SetFilters] = useState({
    Artist: "",
    Album: "",
    Language: "",
    Category: ""
  });

  // Song uploading Form Data





  return (
    <div className='w-[80%] m-auto border-2 mt-20 p-5 shadow-sm rounded-lg'>
      <div className=''>
        <div>
          <input type='text' placeholder='song name' value={songName}
            onChange={(e) => setsongName(e.target.value)}
            className='p-3 bg-white rounded-sm w-full' />
        </div>

        <div className='flex justify-between items-center mt-5'>
          <DropDown name={"Artist"} dataInfo={artists} setFilters={SetFilters}  Filters={Filters} />
          <DropDown name={"Album"} dataInfo={albums} setFilters={SetFilters}  Filters={Filters} />
          <DropDown name={"Language"} dataInfo={languages} setFilters={SetFilters}  Filters={Filters} />
          <DropDown name={"Category"} dataInfo={Categories} setFilters={SetFilters}  Filters={Filters} />
        </div>

        <FileUploadComponent uploadType={"image"} uploadPAth={"songs/Images"} uploadedFileURL={uploadedImageURL} setUploadedFileURL={setUploadedImageURL} />

        <FileUploadComponent uploadType={"audio"} uploadPAth={"songs/Audio"}  uploadedFileURL={uploadedAudioURL} setUploadedFileURL={setUploadedAudioURL}  />


      </div>
    </div>
  )
}

export default NewSong