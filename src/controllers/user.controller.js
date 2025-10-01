import { asyncHandler } from "../utils/asyncHandler";

const registerUser = asyncHandler((req,res)=>{
    res.status(200).json({
        message: "ok"
    })
})

export {registerUser}