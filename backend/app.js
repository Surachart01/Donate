import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import donateRoutes from './routes/donateRouter.js'
import generatePayload from "promptpay-qr";
import QRCode from "qrcode";


// Initialize
const app = express()
app.use(cors())
app.use(express.json())
connectDB();

// QR Code generation
app.get("/api/qrcode", async (req, res) => {
    const phone = "1939900507053"
    const amount = 50

    const payload = generatePayload(phone, { amount: parseFloat(amount) || undefined });
    const qrCodeImage = await QRCode.toDataURL(payload);

    res.json({ qrCode: qrCodeImage });
});



// Static file for uploads
app.use('/uploads', express.static('uploads'));
app.use('/api', donateRoutes);

export default app;
