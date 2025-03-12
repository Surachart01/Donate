import React from "react";
import "../css/Form.css";
import ComEdu from "../images/ComLogo.png";
import Toyo from "../images/Toyo.jpg";
import IG from "../images/Instagram_logo_2022.svg.png";

// Screen Page

const Form = () => {
  return (
    <div className="container-donate">
      <div className="flex justify-center">
        <img src={ComEdu} alt="" width={400} className="mt-4" />
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="flex justify-end">
          <img src={Toyo} alt="" width={400} className="rounded-xl" />
        </div>
        <div className="">
          <img src={IG} alt="" width={80} />
          <div className="mt-3">
            <h1
              className="text-6xl text-white"
              style={{ fontFamily: "Outfit" }}
            >
              PPS.Ch
            </h1>
          </div>
          <div className="mt-3">
            <h1
              className="text-2xl text-white"
              style={{ fontFamily: "Prompt" }}
            >
              ทดสอบๆและนี่คือเสียงจากเด็กวัด
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
