import mongoose from "mongoose";
const companySchema=new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:false},
    website:{type:String, required:false},
    location:{type:String, required:false},
    logo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

export const Company=mongoose.model('Company',companySchema);