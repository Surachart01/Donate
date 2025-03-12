import express from 'express'
import cors from 'cors'
import {connectDB} from './config/db.js'
import donateRoutes from './routes/donateRouter.js'
// Initialize

const app = express()
app.use(cors())
app.use(express.json())
connectDB();

app.use('/uploads', express.static('uploads')); 
app.use('/api', donateRoutes);

export default app;