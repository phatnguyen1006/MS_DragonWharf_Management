import mongoose from "mongoose"

const tourSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    people: {
        type: Number,
        required: [true, "Number of people is required"]
    },
    guider: {
        type: String
    },
    note: {
        type: String
    },
    fee: {
        type: Number
    },
    inspected: {
        type: Boolean,
        default: false
    }
})

const Tour = mongoose.model("Tour", tourSchema)
export default Tour;