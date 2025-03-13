import React, { useEffect, useState } from "react";
import "../css/Form.css";
import ComEdu from "../images/ComLogo.png";
import IG from "../images/Instagram_logo_2022.svg.png";
import { editDonate, getDonateByStatus } from "../service/api";

// Screen Page
const Form = () => {
  const [queue, setQueue] = useState([]);  // เก็บข้อมูลทั้งหมด
  const [show, setShow] = useState({});    // เก็บข้อมูลที่กำลังแสดง
  const [currentIndex, setCurrentIndex] = useState(0); // ชี้ว่ากำลังแสดง index ไหน

  // ดึงข้อมูลจาก API
  const fetchQueue = async () => {
    try {
      const res = await getDonateByStatus("Complate");
      if(res.status == 200){
        setQueue(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching queue:", error);
    }
  };

  const updateStatus = async () => {
    console.log(show)
    var formData = new FormData();
    formData.append("igName", show.igName)
    formData.append("description", show.description)
    formData.append("status", "Showed");
    formData.append("imageUrl", show.imageUrl)
    formData.append("slipUrl", show.slipUrl)
    formData.append("dateTime", show.dateTime)
    const res = await editDonate(show._id, formData)
    // fetchQueue()
  }

  useEffect(() => {
    setInterval(() => {
      fetchQueue();
    }, 10000)
  }, [])

  useEffect(() => {
    console.log(queue.length)
    if (queue.length == 0) {
      setShow({})
    }
    const timer = setTimeout(() => {
      setShow(queue[0]);
      setQueue((prevQueue) => prevQueue.slice(1));
    }, 5000);

    return () => {
      clearTimeout(timer)
      updateStatus()
    };
  }, [queue]);


  return (
    <div className="container-donate">
      <div className="flex justify-center">
        <img src={ComEdu} alt="" width={400} className="mt-4" />
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="flex justify-end">
          {show?.imageUrl && <img src={show.imageUrl} alt="Image" width={400} className="rounded-xl" />}
        </div>
        <div className="">
          <img src={IG} alt="" width={80} />
          <div className="mt-3">
            <h1 className="text-6xl text-white" style={{ fontFamily: "Outfit" }}>
              {show?.igName && show.igName}
            </h1>
          </div>
          <div className="mt-3">
            <h1 className="text-2xl text-white" style={{ fontFamily: "Prompt" }}>
              {show?.description && show.description}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
