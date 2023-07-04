import axios from "axios";
import {userApi,songsApi,artistApi,albumApi} from '../utils'

//TODO:check user user token register and update the data into mongoDb
export const ValidateUserLogin = async (token) =>{
   return await axios.get(`${userApi}/login`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}

export const AllUsers = async () =>{
    return await axios.get(`${userApi}/fetch`);
}

export const AllSongs = async () =>{
    return  await axios.get(songsApi)
}

export const AllArtists = async () =>{
  return  await axios.get(artistApi)
}

export const AllAlbums = async () =>{
   return await axios.get(albumApi);
}
