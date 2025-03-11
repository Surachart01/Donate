import mongoose from "mongoose";

export const donateSchema = new mongoose.Schema({
    igName:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: false
    },
    status: {
        type: String,
        require : true
    }
})

