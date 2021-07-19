import axios from "axios";
import {API_URL} from "./api_constant"


export async function apiGetBilling(){
    return axios.get(API_URL +"bills/")
}

export async function apiPostBilling(customer_id,products,created_date,pay_type,is_company){
    return axios.post(API_URL +"bills/",{
        customer_id:customer_id,
        products:products,
        created_date:created_date,
        pay_type:pay_type,
        is_company:is_company})
}

export async function apiGetBillingById(id){
    return axios.get(API_URL +"bills/"+id)
}
