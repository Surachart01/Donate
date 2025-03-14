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
        required: true,
    },
    slipUrl: {
        type: String,
        required:true
    },
    dateTime: {
        type: String,
        required:true
    },
    sec: {
        type: String,
        required: true
    }

}, { collection: 'donate' }); // 🟢 กำหนดให้ใช้ชื่อเดียวกัน

export default mongoose.model("donate", donateSchema);
