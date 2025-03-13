import React, { useEffect, useState } from "react";
import "../css/Form.css";
import ComEdu from "../images/ComLogo.png";
import IG from "../images/Instagram_logo_2022.svg.png";
import { getDonateByStatus } from "../service/api";

// Screen Page
const Form = () => {
  const [queue, setQueue] = useState([]);  // เก็บข้อมูลทั้งหมด
  const [show, setShow] = useState({});    // เก็บข้อมูลที่กำลังแสดง
  const [currentIndex, setCurrentIndex] = useState(0); // ชี้ว่ากำลังแสดง index ไหน

  let index = 0;
  // ดึงข้อมูลจาก API
  const fetchQueue = async () => {
    try {
      index = 0
      const res = await getDonateByStatus("Complate");
      setQueue(res.data);
      if (res.data.length > 0) {
        setShow(res.data[0]); // เริ่มต้นด้วยข้อมูลแรก
      }
    } catch (error) {
      console.error("Error fetching queue:", error);
    }
  };

  useEffect(() => {
    fetchQueue(); // โหลดข้อมูลครั้งแรก
  }, []);

  useEffect(() => {
    setShow(queue[index])
    setInterval( () => {
      
    }, )
  }, [queue]); // ทำงานเมื่อ queue เปลี่ยนแปลง

  return (
    <div className="container-donate">
      <div className="flex justify-center">
        <img src={ComEdu} alt="" width={400} className="mt-4" />
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="flex justify-end">
          <img src={show.imageUrl} alt="" width={400} className="rounded-xl" />
        </div>
        <div className="">
          <img src={IG} alt="" width={80} />
          <div className="mt-3">
            <h1 className="text-6xl text-white" style={{ fontFamily: "Outfit" }}>
              {show.igName}
            </h1>
          </div>
          <div className="mt-3">
            <h1 className="text-2xl text-white" style={{ fontFamily: "Prompt" }}>
              {show.description}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
