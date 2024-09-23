import {Router} from 'express'
import { login, signUp, uploadUrl, verifyjwt } from '../controller/authController.js'
import {checkJwt} from '../middleware/checkJwt.js'
const authRoutes=Router()
authRoutes.post('/signup',signUp)
authRoutes.get('/verifyjwt',checkJwt,verifyjwt)
authRoutes.post('/login',login)
authRoutes.post('/uploadurl',uploadUrl)


export default authRoutes