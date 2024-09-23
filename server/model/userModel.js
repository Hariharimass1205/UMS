import mongoose from "mongoose";
import { genSalt, hash } from 'bcrypt'
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    username: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    createdAt: { type: Date, default: Date.now }
})

userSchema.pre("save", async function (next) {
    const salt = await genSalt()
    this.password = await hash(this.password, salt)
    next()
})

const user = mongoose.model('Users', userSchema)

export default user