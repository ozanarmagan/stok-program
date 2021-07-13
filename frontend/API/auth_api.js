import axios from "axios";
import {API_URL} from "./api_constant"

export async function apiLogin(username,password){
    return axios.post(API_URL +"login/",{username:username,password:password})
}

export async function apiRegister(username,email,password){
    return axios.post(API_URL+"register/",{username:username,email:email,password:password})
}
