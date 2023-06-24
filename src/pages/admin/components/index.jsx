import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaCloudUploadAlt, FaMusic,FaTrash } from 'react-icons/fa';
import { getDownloadURL, ref, uploadBytesResumable,deleteObject } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';



import { storage } from "../../../config/firebase.js";
import { setGlobalFilters } from '../../../store/reducers.js';
import { MenuItems } from '../../../utils/styles.js';


export const FileUploadField  = ({setIsFileUploading,setUploadedFileURL,setProcess,isImage,uploadPAth,IsFileUploading}) =>{

    const handleUpload = async (e) =>{
      setIsFileUploading(true);
      const file =  e.target.files[0];
      const storageRef =  ref(storage,`${uploadPAth}/${Date.now()}-${file.name}`);

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
    return(
      <label className='flex flex-col items-center justify-center gap-2 h-full w-full'>
        <FaCloudUploadAlt className=' text-5xl text-gray-500' />
        <p className=' text-lg'>Click here to Upload {isImage?"a Image":"an Audio"}</p>
          <input type='file'className='h-0 w-0'
            name='upload-file'
            accept={`${isImage?"image/*":"audio/*"}`}
            onChange={handleUpload}
          />
      </label>
    )
}


export const DropDown = ({ name, dataInfo, setFilters, Filters}) => {
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


export const FileUploadComponent = ({uploadType,uploadPAth,uploadedFileURL,setUploadedFileURL}) =>{

    const [IsFileUploading,setIsFileUploading] = useState(false);
    const [Process, setProcess] = useState(0);

    const deleteFile = (fileUrl,Path,isImage)=>{
        setIsFileUploading(true);
        const deleteRef =  ref(storage,fileUrl);
        deleteObject(deleteRef).then(()=>{
          setUploadedFileURL(null);
          setIsFileUploading(false);
        }).catch(err=>console.log(err));
      }


    return(
        <div className='bg-card backdrop-blur-md border-dotted rounded-md w-full h-300 my-5 flex items-center justify-center cursor-pointer'>

        {IsFileUploading&&(
          <ImageUploadingLoader
            process={Process}
          />
        )}
        
        {!IsFileUploading&&(
          <>
            {!uploadedFileURL?(
              <FileUploadField
                setIsFileUploading={setIsFileUploading}
                setUploadedFileURL={setUploadedFileURL}
                setProcess={setProcess}
                isImage={uploadType==="image"?true:false}
                uploadPAth={uploadPAth}
                IsFileUploading={IsFileUploading}
              />
            ):(
              <div className='flex h-full w-full relative justify-center items-center bg-slate-400 rounded-lg overflow-hidden'>

                {uploadType==="image"?(
                    <img src={uploadedFileURL}
                    referrerPolicy="no-referrer"
                    alt='upload-Cover'
                    className=' w-full object-cover h-full'
                    />
                ):(
                    <audio src={uploadedFileURL} controls />
                )}
                
                
                <button
                className="absolute h-14 w-14 bg-red-500 border-1 rounded-full bottom-3 right-3 z-10 flex justify-center items-center"
                onClick={()=>deleteFile(uploadedFileURL,uploadPAth)}
                >
                   <FaTrash className=" text-white text-xl"/>
                </button>
               
              </div>
            )}
          </>
        )}
         </div>
    );
}