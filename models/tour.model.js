import mongoose from "mongoose"

const tourSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
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
        type: Number,
        required: [true, "Tour fee is required"]
    },
    inspected: {
        type: Boolean,
        default: false
    }
})

const Tour = mongoose.model("Tour", tourSchema)
export default Tour;