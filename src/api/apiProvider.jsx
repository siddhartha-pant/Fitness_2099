// src/api/api.js
import axios from 'axios';
export const baseUrl=import.meta.env.BASE_URL;

export const baseAPI=axios.create({
  baseURL:baseUrl,
  headers:{
    "Content-Type":"application/json"
  }
})
  const API=axios.create({
    baseURL:baseUrl,
    headers:{
       "Content-Type":"application/json"
    }
  })
  API.interceptors.request.use(
    config=>{
      const token=localStorage.getItem("token")
      if(token){
        config.headers["Authorization"]=`Bearer ${token}`  
      }
      return config;
    },
    error=>{
      Promise.reject(error)
    }
  )

  export default API

