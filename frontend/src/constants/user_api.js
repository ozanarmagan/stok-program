import axios from "axios";
import {API_URL} from "./api_constant"

export async function apiGetUsers(){
    return axios.get(API_URL +"users/")
}

export async function apiGetUserById(id){
    return axios.get(API_URL+"users/"+id+"/")
}

