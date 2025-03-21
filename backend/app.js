import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import donateRoutes from './routes/donateRouter.js'
import generatePayload from "promptpay-qr";
import QRCode from "qrcode";
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// Initialize
const app = express()
app.use(cors())
app.use(express.json())
connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// QR Code generation
app.get("/api/qrcode/:amount", async (req, res) => {
    const {amount} = req.params
    const phone = "1939900507053"
    if(!amount){
        return res.status(400).json({msg:"Please send amount"})
    }

    const payload = generatePayload(phone, { amount: parseFloat(amount) || undefined });
    const qrCodeImage = await QRCode.toDataURL(payload);

    res.json({ qrCode: qrCodeImage });
});

// Static file for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api', donateRoutes);

export default app;
