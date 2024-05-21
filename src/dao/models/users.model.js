import mongoose from "mongoose";

mongoose.pluralize(null);

const collection='users';

const schema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    rol:{type:String,enum:['admin','primium'],default:'user'}
})

export const modelUser=mongoose.model(collection,schema);