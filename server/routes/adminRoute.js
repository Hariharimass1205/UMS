import { Router } from 'express'
import { adduser, adminlogin, deleteuser, edituser, userdetails, userDetailsEdit, verifyadminjwt } from '../controller/adminController.js'

const adminRoutes = Router()
adminRoutes.get('/verifyadminjwt',verifyadminjwt)
adminRoutes.post('/adduser', adduser)
adminRoutes.post('/adminlogin',adminlogin)
adminRoutes.get('/userdetails',userdetails)
adminRoutes.post('/deleteuser',deleteuser)
adminRoutes.post('/userdetailsedit/:userId',userDetailsEdit)
adminRoutes.post('/edituser',edituser)

export default adminRoutes