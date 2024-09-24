import {Router} from 'express'
import { login, signUp, uploadUrl, verifyjwt } from '../controller/authController.js'
const authRoutes=Router()
authRoutes.post('/signup',signUp)
authRoutes.get('/verifyjwt',verifyjwt)
authRoutes.post('/login',login)
authRoutes.post('/uploadurl',uploadUrl)


export default authRoutes