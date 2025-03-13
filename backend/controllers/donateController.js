import path from 'path';
import donate from '../models/donate.js';
import multer from 'multer';
import axios from 'axios'
import * as cheerio from 'cheerio';  // Corrected import for ES module

// ✅ ตั้งค่า multer สำหรับอัปโหลดไฟล์
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // เก็บไฟล์ไว้ในโฟลเดอร์ uploads/
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์ใหม่
    }
});

const upload = multer({ storage });

// ✅ ดึงข้อมูลทั้งหมด
export const getAllDonate = async (req, res) => {
    try {
        const data = await donate.find({});
        res.status(200).json({ msg: "Get all donate success", data: data });
    } catch (error) {
        res.status(500).json({ msg: "Cannot get data.", error: error.message });
    }
};

// ✅ ดึงข้อมูลตาม ID
export const getDonateById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await donate.findById(id);

        if (!data) {
            return res.status(404).json({ msg: "Not found" });
        }
        res.status(200).json({ msg: "Get data success", data: data });
    } catch (error) {
        res.status(500).json({ msg: "Cannot get data.", error: error.message });
    }
};

// ✅ ค้นหาข้อมูลตามชื่อ หรือ คำอธิบาย
export const searchDonate = async (req, res) => {
    try {
        const { query } = req.query;
        const data = await donate.find({
            $or: [
                { igName: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ]
        });

        res.status(200).json({ msg: "Search success", data: data });
    } catch (error) {
        res.status(500).json({ msg: "Cannot get data.", error: error.message });
    }
};

export const getDonateByStatus = async (req, res) => {
    try {
        const { status } = req.params; // ✅ ดึงค่า status ออกมาโดยตรง
        
        const data = await donate.find({ status }); // ✅ ค้นหาตามค่าที่ถูกต้อง

        if (!data || data.length === 0) {
            return res.status(404).json({ msg: "Not Found" }); // ✅ ใช้ตัวเลข 404
        }

        res.status(200).json({ msg: "Get data success", data: data }); // ✅ ใช้ตัวเลข 200
    } catch (error) {
        res.status(500).json({ msg: "Cannot get data.", error: error.message });
    }
};


// Get Instagram Profile Picture
const searchImage = async (username) => {

    try {
        // ดึง HTML ของหน้า Instagram
        const response = await axios.get(`https://www.instagram.com/${username}/`);

        // ใช้ cheerio ในการโหลด HTML และค้นหา <meta> ที่มีข้อมูลรูปโปรไฟล์
        const $ = cheerio.load(response.data);

        // ค้นหาค่า og:image ใน <meta> ซึ่งจะมี URL รูปโปรไฟล์
        const profilePicUrl = $('meta[property="og:image"]').attr('content');

        if (profilePicUrl) {
            console.log("Profile Picture URL: ", profilePicUrl);
            return profilePicUrl
        } else {
            console.log("ไม่พบข้อมูลรูปโปรไฟล์");
            return "404"
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลจาก Instagram: ", error);
    }
};

// ✅ เพิ่มข้อมูลใหม่และอัปโหลดรูป
export const createDonate = async (req, res) => {
    try {
        const { igName, description } = req.body;

        const status = "Pendding"
        if (!req.file) {
            return res.status(400).json({ msg: "No file uploaded" });
        }
        const imageUrl = await searchImage(igName);
        if (imageUrl == "404") {
            return res.status(404).json({ msg: "Not found image on Instargram" });
        }

        const slipUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        const date = new Date(Date.now());
        date.toLocaleString()
        const dateTime = date.toLocaleString()
        const newDonate = new donate({
            igName,
            description,
            status,
            imageUrl,
            slipUrl,
            dateTime
        });

        await newDonate.save();
        res.status(201).json({ msg: "Donate created", data: newDonate });
    } catch (error) {
        res.status(500).json({ msg: "Error creating donate.", error: error.message });
    }
};

// ✅ แก้ไขข้อมูล donate
export const editDonate = async (req, res) => {
    try {
        const { igName, description, status } = req.body;
        const { id } = req.params;

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!igName || !description) {
            return res.status(400).json({ msg: "Data incorrect" });
        }

        // ค้นหาข้อมูลเดิมจาก MongoDB
        const existingDonate = await donate.findById(id);
        if (!existingDonate) {
            return res.status(404).json({ msg: "Donate not found" });
        }

        // อัปเดตข้อมูลใน MongoDB
        existingDonate.igName = igName;
        existingDonate.description = description;
        existingDonate.status = status || existingDonate.status; // ถ้าไม่ได้ส่ง status มาจะไม่เปลี่ยนแปลง

        // บันทึกการเปลี่ยนแปลงลงใน MongoDB
        await existingDonate.save();

        res.status(200).json({ msg: "Donate updated successfully", data: existingDonate });
    } catch (error) {
        res.status(500).json({ msg: "Error updating donate", error: error.message });
    }
};

// ✅ ลบข้อมูล donate
export const deleteDonate = async (req, res) => {
    try {
        const { id } = req.params;

        // ค้นหาข้อมูลที่ต้องการลบจาก MongoDB
        const existingDonate = await donate.findById(id);
        if (!existingDonate) {
            return res.status(404).json({ msg: "Donate not found" });
        }

        // ลบข้อมูลออกจาก MongoDB
        await existingDonate.remove();

        res.status(200).json({ msg: "Donate deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting donate", error: error.message });
    }
};




// ✅ Export upload middleware
export { upload };
