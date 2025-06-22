import axios from "axios"

import { baseAPI } from "../../api/apiProvider"




export const getUserProfile=async(token)=>{
   
    try{ 
        console.log(token);
        const response=await baseAPI.get("https://connectusonfitness.onrender.com/api/v1/profile", {headers:{
           'Authorization': `Bearer ${token}`

        }})
        return response.data;
    }
    catch(error){
    throw error
    }
}