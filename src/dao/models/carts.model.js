import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'carts';

const schema = new mongoose.Schema({
    _user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: {
        type: [
            {
                _id:{type:mongoose.Schema.Types.ObjectId,ref:'products'},
                quantity:{type:Number,default: 1 }
            }
        ], required: true
    }
})

export const modelCart = mongoose.model(collection, schema);