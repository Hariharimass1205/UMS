import dotenv from 'dotenv'
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import adminRoutes from './routes/adminRoute.js'


dotenv.config()
const app = express()
app.use(cors({
    origin: process.env.CLIENT,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    credentials: true
}));
app.use(cookieParser());
app.use(morgan('dev'))
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/auth', adminRoutes)
app.listen(process.env.PORT, console.log('server connected'))
const databaseurl =process.env.DATABASE_URL
mongoose.connect(databaseurl).then(() => console.log('Database connected')).catch(err=>console.log(err.message))
