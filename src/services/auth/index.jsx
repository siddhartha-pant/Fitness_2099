import { useDispatch } from "react-redux"
import { baseAPI } from "../../api/apiProvider"
const dispatch=useDispatch();
export const signin=async({email, password})=>{
    const payload=
        {
        "email": email,
        "password": password
        }
    try{ 
        const response=await baseAPI.post("auth/signin", payload)
        dispatch(loginSuccess(response.data.token))
    }
    catch(error){
    throw error
    }
}


export const signup=async({ name, email, password, gender, age })=>{
    const payload=
        {
        "email": email,
        "password": password,
        "name":name,
        "gender":gender,
        "age":age
        }
    try{ 
        const response=await baseAPI.post("auth/signup", payload)
        dispatch(loginSuccess(response.data.token))
    }
    catch(error){
    throw error
    }
}