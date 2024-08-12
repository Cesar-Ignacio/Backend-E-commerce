import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
mongoose.pluralize(null);

const collection = 'products';

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    owner: { type: String, default: 'ADMIN' },
    status: { type: Boolean, default: true }
})

schema.plugin(mongoosePaginate);

export const modelProduct = mongoose.model(collection, schema);