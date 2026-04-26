import { application } from 'express';
import mongoose from 'mongoose';
const jobschema=new mongoose.Schema({
    title:{ type:String, required:true },
    discription:{type:String, required:true},
    requirements:[{type:String}],
    salary:{type:Number, required:true},
    experience:{type:Number, required:true},
    location:{type:String, required:true},
    jobType:{
        type:String,
        required:true,
    },
    position:{type:Number, required:true},

    company:{type:mongoose.Schema.Types.ObjectId, ref:'Company', required:true},
    created_By:{
        type:mongoose.Schema.Types.ObjectId, ref:'User', required:true}, 
    applications:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Application",
    }]
 },{timestamps:true})


 export const job=mongoose.model('Job',jobschema);