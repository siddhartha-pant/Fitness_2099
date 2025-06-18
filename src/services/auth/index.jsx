import axios from "axios"
import { useDispatch } from "react-redux"
import { baseAPI } from "../../api/apiProvider"

export const signin=async({email, password})=>{
    const dispatch=useDispatch();
    const payload=
        {
        "email": email,
        "password": password
        }
    try{ 
        const response=await baseAPI.post("auth/signin", payload)
        dispatch(loginSuccess(response.data.token))
        return response.data;
    }
    catch(error){
    throw error
    }
}


export const signup=async({ name, email, password, gender, age })=>{
    console.log(name, email, password, age, gender)
    // const dispatch=useDispatch();
    const payload=
        {
        "email": email,
        "password": password,
        "name":name,
        "gender":gender,
        "age":age
        }
        console.log("above try", payload)
    try{ 
        console.log("we are inside try")
        const response=await axios.post("https://connectusonfitness.onrender.com/api/v1/auth/signup", payload)
        // dispatch(loginSuccess(response.data.token))
        return response.data;
    }
    catch(error){
    throw error
    }
}