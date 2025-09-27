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
    fullName:{
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

userSchema.pre("save",async function (next) { //password encryption --> this is a middleware that encrypts passwords before saving them
    if (this.isModified("password")) {
        this.password = bcrypt.hash(this.password,10);
    }
    next();
})
userSchema.methods.isPasswordCorrect = async function (password) {  //password matching --> method that checks passwords if the password in Db is the same as the pasword entered by the user
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){ //generating an access token which is savesd by the client in its browser for accessing data from db after password matching ,,,it is sent for each request 
    return jwt.sign(
        {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () { //this is a token used for getting new access tokens ,,, the refresh token is sent as an httponly cookie or in the response body
     return jwt.sign(
        {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema);