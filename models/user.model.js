import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{ 
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true
    },
    passward:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        default:'student',
        required:true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:[{type:mongoose.Schema.Types.ObjectId,ref:'Company'}],
        profilePhoto:{
            type:String,
            default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
        },
    }
},{timestamps:true})

export const user=mongoose.model('User',userSchema);