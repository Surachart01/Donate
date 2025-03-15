import React, { useEffect, useState } from "react";
import "../css/Form.css";
import ComEdu from "../images/ComLogo.png";
import QrCode from '/QrCode.jpeg'
import IG from "../images/Instagram_logo_2022.svg.png";
import { editDonate, getDonateByStatus } from "../service/api";
import { Img } from "react-image";

const Form = () => {
  const [queue, setQueue] = useState([]);  // คิวทั้งหมด
  const [show, setShow] = useState(null);  // ข้อมูลที่กำลังแสดง
  const [fetching, setFetching] = useState(false);

  // ฟังก์ชันดึงข้อมูลจาก API
  const fetchQueue = async () => {
    try {
      const res = await getDonateByStatus("Complete");
      console.log(res);
      if (res.status === 200) {
        setQueue(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching queue:", error);
    } finally {
      setFetching(false); // ตั้งค่า fetching เป็น false เมื่อดึงข้อมูลเสร็จ
    }
  };

  // ฟังก์ชันอัปเดตสถานะ
  const updateStatus = async (data) => {
    try {
      let formData = new FormData();
      formData.append("igName", data.igName);
      formData.append("description", data.description);
      formData.append("status", "Showed");
      formData.append("imageUrl", data.imageUrl);
      formData.append("slipUrl", data.slipUrl);
      formData.append("dateTime", data.dateTime);
      formData.append("sec", data.sec);
      await editDonate(data._id, formData);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // เรียก fetchQueue ทุกๆ 5 วินาที
  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 5000);

    return () => clearInterval(interval); // ล้าง interval เมื่อคอมโพเนนต์ถูกถอดออก
  }, []);

  // จัดการการแสดงข้อมูลทีละตัวจากคิว
  useEffect(() => {
    const processQueue = () => {
      if (queue.length > 0) {
        const currentShow = queue[0];
        setShow(currentShow); // แสดงข้อมูลใหม่

        updateStatus(currentShow); // อัปเดตสถานะ

        setQueue((prevQueue) => prevQueue.slice(1)); // ลบข้อมูลตัวแรกจากคิว

        // เคลียร์ state ของ show หลังจากแสดงข้อมูลเสร็จ
        setTimeout(() => {
          setShow(null); // เคลียร์ state ของ show หลังจากแสดงข้อมูล
        }, currentShow.sec * 1000); // ระยะเวลาแสดงตาม sec ที่กำหนดในข้อมูล
      }
    };

    // ตั้งเวลาแสดงข้อมูลทีละตัว โดยใช้ sec ของข้อมูลที่ต้องการแสดง
    if (queue.length > 0 && show === null) {
      const currentShow = queue[0];
      processQueue()
      const timer = setTimeout(processQueue, currentShow.sec * 1000); // แสดงข้อมูลตามเวลา sec
      return () => clearTimeout(timer); // ลบ timer เมื่อคิวเปลี่ยนแปลง
    }
  }, [queue, show]); // เมื่อ queue หรือ show เปลี่ยนแปลง

  return (
    <div className="container-donate">
      <div className="flex justify-between ms-3">
        <img src={ComEdu} alt="" width={'30%'} style={{height:'auto'}} className="mt-1" />
        {show?.imageUrl && <img src={QrCode} alt="" width={'15%'} className="mt-1 me-10 mt-10" />}
      </div>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <div className="flex justify-center">
          {show?.imageUrl && <Img src={show.imageUrl} alt="Image" width={'63%'} className="rounded-xl me-10" />}
        </div>
        <div>
          {show && <img src={IG} alt="" width={130} />}
          <div className="mt-3">
            <h1 className="text-7xl text-white" style={{ fontFamily: "Outfit", wordWrap: "break-word" }}>
              {show?.igName || ""}
            </h1>
          </div>
          {!show && <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
            <img src={QrCode} alt="" width={'45%'} className="mt-1 ps-4 me-10 mt-10" />
          </div>
          }

          <div className="mt-3">
            <h1 className="text-5xl text-white" style={{ fontFamily: "Prompt", wordWrap: "break-word" }}>
              {show?.description || ""}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
