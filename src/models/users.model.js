import mongoose from "mongoose";
import { DateTime } from "luxon";

mongoose.pluralize(null);

const collection = 'users';

const schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    last_connection: { type: Date, default: DateTime.now() },
    cart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    role: { type: String, enum: ['ADMIN', 'PREMIUM', 'USER'], default: 'USER' },
    documents: {
        type: [
            {
                name: { type: String, required: true },
                reference: { type: String, required: true }
            }
        ]
    },
    hasDocuments: { type: Boolean, default: false }
})

export const modelUser = mongoose.model(collection, schema);