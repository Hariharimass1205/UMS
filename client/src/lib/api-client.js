import axios from 'axios'
import { HOST } from '../utils/Constants'

export const apiClient = axios.create({
    baseURL:HOST,
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials: true
}   
)