import express from 'express';
import { getAllDonate, getDonateById, searchDonate, createDonate, editDonate, deleteDonate, upload } from '../controllers/donateController.js';

const router = express.Router();

// ✅ ดึงข้อมูลทั้งหมด
router.get('/donates', getAllDonate);

// ✅ ดึงข้อมูลตาม ID
router.get('/donates/:id', getDonateById);

// ✅ ค้นหาข้อมูล
router.get('/donates/search', searchDonate);

// ✅ สร้างข้อมูลใหม่
router.post('/donates', upload.single('image'), createDonate);

// ✅ แก้ไขข้อมูล
router.put('/donates/:id', editDonate);

// ✅ ลบข้อมูล
router.delete('/donates/:id', deleteDonate);

export default router;
