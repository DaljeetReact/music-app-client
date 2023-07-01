import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaCloudUploadAlt, FaMusic, FaTrash } from 'react-icons/fa';
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'


import { storage } from "../../../config/firebase.js";
import { setGlobalFilters } from '../../../store/reducers.js';
import { MenuItems } from '../../../utils/styles.js';
import { songsApi, artistApi, albumApi } from "../../../utils/index.js"


export const FileUploadField = ({ setIsFileUploading, setUploadedFileURL, setProcess, isImage, uploadPAth, IsFileUploading }) => {

  const handleUpload = async (e) => {
    setIsFileUploading(true);
    const file = e.target.files[0];
    const storageRef = ref(storage, `${uploadPAth}/${Date.now()}-${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProcess(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadedFileURL(downloadURL);
          setIsFileUploading(false);
          console.log('File available at', downloadURL);
        });
      }
    );

  }
  return (
    <label className='flex flex-col items-center justify-center gap-2 h-full w-full'>
      <FaCloudUploadAlt className=' text-5xl text-gray-500' />
      <p className='px-4 text-sm'>Click here to Upload {isImage ? "a Image" : "an Audio"}</p>
      <input type='file' className='h-0 w-0'
        name='upload-file'
        accept={`${isImage ? "image/*" : "audio/*"}`}
        onChange={handleUpload}
      />
    </label>
  )
}


export const DropDown = ({ name, dataInfo, setFilters, Filters }) => {
  const onlyif = ["Artist", "Album"];
  const dispatch = useDispatch();
  const selectedItems = useSelector(state => state.filters);

  const [isOpen, setIsOpen] = useState(false);

  const HandleSelectedItems = (iteam) => {
    // set local state
    setFilters(prev => ({
      ...prev,
      [iteam.type]: iteam.name
    }));
    //Dispatch action
    dispatch(setGlobalFilters({
      name: name,
      val: onlyif.includes(name) ? iteam._id : iteam.name
    }));

    //change State to normal
    setIsOpen(!isOpen);
  }

  const isActive = (data, name) => {
    let classNa = `${MenuItems} py-4 px-2 flex flex-row items-center gap-2`;
    if ((onlyif.includes(name) && selectedItems[name] === data._id) || (selectedItems[name] === data.name)) { // check for artist and album drop down 
      return `${classNa} border-l-2  bg-red-500 text-white`;
    } else {
      return `${classNa}`;
    }
  }

  return (
    <div className='p-2 py-3 min-w-[130px] border-2 border-gray-400 rounded-md relative '>
      <p
        className='text-base tracking-wide flex items-center gap-2 justify-between'
        onClick={() => setIsOpen(!isOpen)}>
        {Filters[name].length > 0 ? Filters[name] : name}
        <FaChevronDown className={`text-base duration-200 transition-all ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </p>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="absolute min-w-[200px] left-0 top-14 bg-white  rounded-md max-h-80 overflow-auto backdrop-blur-sm scrollbar-thin z-10">
          <ul>
            {dataInfo?.map((vals, index) => (
              <li className={isActive(vals, name)} key={vals._id} onClick={() => HandleSelectedItems({ _id: vals._id, type: name, name: vals.name })}>
                {onlyif.includes(name) && (
                  <FaMusic />
                )}
                <span>
                  {vals.name}
                </span>

              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}


export const ImageUploadingLoader = ({ process }) => {
  return (
    <div className="text-center">
      <span class="relative flex h-20 w-20 justify-center items-center">
        <span class="animate-ping absolute flex h-full w-full rounded-full bg-red-500 opacity-75 left-0 right-0 top-0 bottom-0"></span>
        <span class="relative inline-flex rounded-full">
          {Math.round(process) > 0 && (<>{Math.round(process)}%</>)}
        </span>
      </span>
    </div>
  )
}


export const FileUploadComponent = ({ uploadType, uploadPAth, uploadedFileURL, setUploadedFileURL }) => {

  const [IsFileUploading, setIsFileUploading] = useState(false);
  const [Process, setProcess] = useState(0);

  const deleteFile = (fileUrl, Path, isImage) => {
    setIsFileUploading(true);
    const deleteRef = ref(storage, fileUrl);
    deleteObject(deleteRef).then(() => {
      setUploadedFileURL(null);
      setIsFileUploading(false);
    }).catch(err => console.log(err));
  }


  return (
    <div className='bg-card backdrop-blur-md border-dotted rounded-md w-full h-300 my-5 flex items-center justify-center cursor-pointer'>

      {IsFileUploading && (
        <ImageUploadingLoader
          process={Process}
        />
      )}

      {!IsFileUploading && (
        <>
          {!uploadedFileURL ? (
            <FileUploadField
              setIsFileUploading={setIsFileUploading}
              setUploadedFileURL={setUploadedFileURL}
              setProcess={setProcess}
              isImage={uploadType === "image" ? true : false}
              uploadPAth={uploadPAth}
              IsFileUploading={IsFileUploading}
            />
          ) : (
            <div className='flex h-full w-full relative justify-center items-center bg-slate-400 rounded-lg overflow-hidden'>

              {uploadType === "image" ? (
                <img src={uploadedFileURL}
                  referrerPolicy="no-referrer"
                  alt='upload-Cover'
                  className=' w-full object-cover h-full'
                />
              ) : (
                <audio src={uploadedFileURL} controls />
              )}


              <button
                className="absolute h-14 w-14 bg-red-500 border-1 rounded-full bottom-3 right-3 z-10 flex justify-center items-center"
                onClick={() => deleteFile(uploadedFileURL, uploadPAth)}
              >
                <FaTrash className=" text-white text-xl" />
              </button>

            </div>
          )}
        </>
      )}
    </div>
  );
}


export const ObjectValidator = (data) => {
  let Errors = [];
  for (const [key, value] of Object.entries(data)) {
    console.log(`${key}: ${value}`);
    if (value === null || value === "") {
      Errors.push(key);
    }
  }
  console.log({ Errors });
  return Errors;
}

export const DeleteFileFromFireStore = ({ url, type, id, songUrl }) => {
  const BackEndUrl = { "artist": artistApi, "songs": songsApi, "albums": albumApi };
  const [isDelete, setisDelete] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const DeleteFile = async () => {
    setIsLoading(true);
    let Files = [url,songUrl]; 
   await Files.forEach((file)=>{
      if(file){
         let deleteRef = ref(storage, file);
        deleteObject(deleteRef).then(() => {
          console.log("file has been deleted");
        }).catch(err => console.log(err)).finally(() => {
        
        });
      }
     
    })
    setIsLoading(false);
    deleteForBackEnd(id, type);
  }

  const deleteForBackEnd = async (id, type) => {
    let url = BackEndUrl[type]; // this will get the url form array base on type
     setIsLoading(true);
    await axios.delete(`${url}/${id}`).then(({data}) => {
      
      alert(`${type} has been successfully deleted from back-end ${JSON.stringify(data)}`);
    }).catch(e => console.log(e)).finally(() => {
      setIsLoading(false);
    });

  }

  return (
    <motion.div
      className={`${isDelete && "absolute backdrop-blur-3xl top-0 right-0 bottom-0 left-0 rounded-lg p-4 flex items-center justify-center"} `} key={id}>
      <div >
        {isDelete ? (
          <motion.div
            className='text-center'>
            <p> Are you sure you want to delete this {type}? </p>
            <div className='flex gap-4 mt-3 justify-center'>
            {IsLoading?(
              <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
            ):(
              <>
                <motion.div
                  onClick={DeleteFile}
                  whileTap={{ scale: 0.8 }}
                  className="cursor-pointer bg-red-500 px-3 w-min-[20px] text-sm rounded-md shadow-sm">
                  Yes
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setisDelete(false)}
                  className="cursor-pointer bg-gray-500 px-3 w-min-[20px] text-sm rounded-md shadow-sm">
                  No
                </motion.div>
              </>
            )}
            </div>
          </motion.div>
        ) : (
          <span className="w-8 h-8 absolute top-2 right-2 rounded-full bg-red-500 flex justify-center items-center">
            <FaTrash onClick={() => setisDelete(true)} className=' backdrop-blur-sm text-white' />
          </span>
        )}
      </div>

    </motion.div>
  )
}
