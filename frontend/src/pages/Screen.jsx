import React from "react";
import IG from "../images/instagram-logo-instagram-icon-transparent-free-png.webp";

const Screen = () => {
  return (
    <div>
      <div className="mt-1 justify-items-center">
        <img src={IG} alt="IG icon" width={100} />
        <p className="text-black">ขึ้นจอแบบรูปโปรไฟล์ของคุณ - Instragram</p>
        <h1 className="text-2xl mt-2 font-bold text-black">
          กรุณาใส่ข้อมูลเพื่อขึ้นจอให้กับคุณ
        </h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="ชื่อผู้ใช้ / Username"
          className="input input-bordered w-72 max-w-xs mt-4"
        />
      </div>
      <div>
        <h1 className="text-2xl mt-3 font-bold text-black">
          เขียนข้อความขึ้นหน้าจอ
        </h1>
      </div>
      <div>
        <textarea
          className="textarea textarea-bordered mt-3"
          placeholder="เขียนข้อความของคุณเอง กรุณาใช้ถ้อยคำสุภาพ"
        ></textarea>
      </div>
      <div>
        <button className="btn btn-wide btn-success mt-3 rounded-full">สร้างข้อความ {"(50 บาท)"} </button>
      </div>
    </div>
  );
};

export default Screen;
