import axios from "axios";
import {userApi} from '../utils'

//TODO:check user user token register and update the data into mongoDb
export const ValidateUserLogin = async (token) =>{
   return await axios.get(`${userApi}/login`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}