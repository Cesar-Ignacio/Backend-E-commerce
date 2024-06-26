import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'users-test';

const schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    cart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    role: { type: String, enum: ['admin', 'primium', 'user'], default: 'user' }
})

export const modelUser = mongoose.model(collection, schema);