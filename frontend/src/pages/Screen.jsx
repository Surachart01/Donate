import React, { useEffect, useState } from "react";
import { Button, Card, Flex, Form, Input, Modal, notification, Slider, Spin, Upload } from 'antd'
import NavBar from "../components/NavBar";
import '../css/Screen.css'
import TextArea from "antd/es/input/TextArea";
import { createDonate, getQrcode, profileIg } from "../service/api";
import { PlusOutlined } from '@ant-design/icons'

const Screen = () => {
  const [modal, setModal] = useState(false)
  const [qrcode, setQrcode] = useState()
  const [igName, setIgName] = useState()
  const [description, setDescription] = useState()
  const [sec , setSec] = useState(0);
  const [loadding , setLoadding] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault()
    if(sec == 0){
      notification.error({
        message:"โปรดเลือกราคาที่ต้องการก่อนกดยืนยัน"
      })
      return
    }
    setModal(true);
    let amount = sec==15?'50':(sec==40)?'80':'100';
    const res = await getQrcode(amount)
    console.log(res)
    setQrcode(res.data.qrCode);
  }

  const handleSubmitForm = async (e) => {
    setLoadding(true);
    const fileList = e.imageSlip; // Get the uploaded file(s)
    const file = fileList && fileList[0] ? fileList[0].originFileObj : null; // Get the first file's original object

    if (!file) {
      notification.error({
        message: "โปรดเลือกรูปภาพก่อนส่งข้อมูล"
      });
      return;
    }
    // Prepare form data for submission
    let formData = new FormData();
    formData.append("igName", igName);
    formData.append("description", description);
    formData.append("image", file);
    formData.append("sec",sec);
    
    try {
      const res = await createDonate(formData);
      // Check for the success status code (201 for created)
      console.log(res)
      if (res.status == "201") {
        console.log(res.status)
        notification.success({
          message: "ส่งข้อมูลเสร็จสิ้น (โปรดรอพนักงานทำการตรวจสอบและยืนยัน)"
        });
        window.location.reload()
      } 
      else if (res.status == "404") {
        notification.error({
          message: "ชื่อ Instagram ไม่ถูกต้อง"
        });
      } 
      else {
        notification.error({
          message: "เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้ง"
        });
        window.location.reload()
      }
  
    } catch (error) {
      // Handle network or unexpected errors
      console.error("Error during submission:", error);
      if(error.status == "404"){
        notification.error({
          message: "ชื่อ Instagram ไม่ถูกต้อง"
        });
      }else{
        notification.error({
          message: "เกิดข้อผิดพลาดในการส่งข้อมูล โปรดลองใหม่อีกครั้ง"
        });
      }
      
    } finally {
      setLoadding(false);
      setModal(false);  // Close the modal after submission

    }
  };
  

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };



  return (
    <div className="bg-slate-950 h-screen">
      <Flex justify="space-between" className="navbarrr py-3 px-3">
        <p>Donate</p>
      </Flex>      

      <Flex vertical={true} className="mt-5" justify="center" align="center">
        <img src="/logoIg.webp" width={'200px'} alt="" />
        <p className="text-xl text-white">กรุณาใส่ข้อมูลเพื่อขึ้นจอให้กับคุณ</p>
        <form onSubmit={handleSubmit} className="formDonate" style={{ width: "80%" }}>
          <label htmlFor="igName">ชื่อ Instagram</label>
          <div>
            <input type="text" id="igName" onChange={(e) => setIgName(e.target.value)} required name="igName" className="inputForm" />
            <div id="igNameError" className="error-message" />
          </div>
          <label htmlFor="description">รายละเอียด (ขึ้นหน้าจอ)</label>
          <div>
            <textarea id="description" required name="description" onChange={(e) => setDescription(e.target.value)} className="inputForm" rows={4} defaultValue={""} />
            <div id="descriptionError" className="error-message" />
          </div>
          <div className="">
            <label htmlFor="">ราคา</label>
            <select name="sec" id="" onChange={(e) => setSec(e.target.value)} required={true} className="inputForm mb-3">
              <option value="0">โปรดเลือกราคาที่ต้องการ</option>
              <option value="15">ขึ้นหน้าจอ 15 วินาที ราคา 50บาท</option>
              <option value="40">ขึ้นหน้าจอ 40 วินาที ราคา 80บาท</option>
              <option value="80">ขึ้นหน้าจอ 80 วินาที ราคา 100บาท</option>
            </select>
          </div>
          <button type="submit" className="butt w-full">ยืนยัน</button>
        </form>

      </Flex>

      <Modal open={modal} footer={null} onCancel={() => { setModal(false) }}>
        <Flex vertical="true" justify="center" align="center">
          {qrcode && <img src={qrcode} alt="QR Code" />}
          <Form onFinish={handleSubmitForm}>
            <Form.Item label="Upload"
              name="imageSlip"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "กรุณาอัปโหลดสลิปการชำระเงิน" }]}>
              <Upload name="imageSlip" listType="picture-card">
                <button
                  style={{
                    color: 'inherit',
                    cursor: 'inherit',
                    border: 0,
                    background: 'none',
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <button type="submit" disabled={loadding} className="butt">ยืนยันการชำระเงิน</button>
            </Form.Item>
          </Form>
          {loadding?<Spin style={{backgroundColor:"#fff"}} />:''}
        </Flex>

      </Modal>
    </div>

  );
};

export default Screen;
