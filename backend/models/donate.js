import mongoose from "mongoose";

const donateSchema = new mongoose.Schema({
    igName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    }
}, { collection: 'donate' }); // 🟢 กำหนดให้ใช้ชื่อเดียวกัน

export default mongoose.model("donate", donateSchema);
