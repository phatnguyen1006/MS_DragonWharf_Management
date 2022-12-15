import mongoose from "mongoose"

const tourSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
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
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "approved", "rejected"]
    },
    rejectReason: {
        type: String,
        require: false
    }
})

const Tour = mongoose.model("Tour", tourSchema)
export default Tour;