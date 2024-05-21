import mongoose from "mongoose";

mongoose.pluralize(null);

const collection='messages';

const schema=new mongoose.Schema({
    email:{type:String,required:true},
    message:{type:String,required:true}

})

export const modelMessage=mongoose.model(collection,schema);