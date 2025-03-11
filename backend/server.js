import http from "http";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

// สร้าง HTTP Server
const server = http.createServer(app);

// เริ่มรันเซิร์ฟเวอร์
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});