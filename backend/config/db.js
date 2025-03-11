import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB connected...');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

