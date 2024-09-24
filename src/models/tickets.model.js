import mongoose from "mongoose";
import { DateTime } from "luxon";

mongoose.pluralize(null);

const collection = "tickets";

const schema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
    purchase_datetime: { type: Date, default: DateTime.now() },
    products: {
        type: [
            {
                code: { type: String, required: true, unique: true },
                title: { type: String, required: true },
                quantity: { type: Number, default: 1 },
                price: { type: Number, required: true },
            }
        ], required: true
    }
})

export const modelTicket = mongoose.model(collection, schema);