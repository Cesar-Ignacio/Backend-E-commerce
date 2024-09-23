import mongoose from "mongoose";
import { DateTime } from "luxon";

mongoose.pluralize(null);

const collection = "tickets";

const schema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
    purchase_datetime: { type: Date, default: DateTime.now() }
})

export const modelTicket = mongoose.model(collection, schema);