import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from bcrypt;
import jwt from jwt;
const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    fullname:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar:{
        type: String, //cloudinary url
        required: true,
    },
    coverImage:{
        type: String,

    },
    watchHistory:[
        {
        type: Schema.Types.ObjectId,
        ref: "video"
        }   
    ],
    password: {
        type: String,
        required: [true,"password is required"]
    },
    refreshToken:{
        type: String
    }
},{timestamps: true});

userSchema.pre("save",async function (next) { //password encryption
    if (this.isModified("password")) {
        this.password = bcrypt.hash(this.password,10);
    }
    next();
})
userSchema.methods.isPasswordCorrect = async function (password) {  //password matching
    return await bcrypt.compare(password,this.password);
}
export const User = mongoose.model("User",userSchema);