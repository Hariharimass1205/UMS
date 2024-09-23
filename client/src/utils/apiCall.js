import { apiClient } from "../lib/api-client"
import { VERIFY_ADMIN_JWT, VERIFY_JWT } from "./Constants"

export async function verifyJWT(){
    try {
       const res=await apiClient.get(VERIFY_JWT) 
       return res.data
    } catch (error) {
    throw new Error(error.message)
    }
}

export async function verifyAdminJWT(){
    try {
       const res=await apiClient.get(VERIFY_ADMIN_JWT) 
       return res.data
    } catch (error) {
    throw new Error(error.message)
    }
}