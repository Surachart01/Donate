import express from 'express'
import cors from 'cors'
import {connectDB} from './config/db.js'
// Initialize

const app = express()
app.use(cors())
app.use(express.json())
connectDB();


export default app;