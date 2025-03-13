import React, { useEffect, useState } from "react";
import { Button, Card, Flex, Form, Input, Modal, Slider, Upload } from 'antd'
import NavBar from "../components/NavBar";
import '../css/Screen.css'
import TextArea from "antd/es/input/TextArea";
import { getQrcode } from "../service/api";
import { PlusOutlined } from '@ant-design/icons'

const Screen = () => {
  const [modal, setModal] = useState(false)
  const [qrcode, setQrcode] = useState()
  const [igName, setIgName] = useState()
  const [description, setDescription] = useState()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setModal(true);
    const res = await getQrcode()
    console.log(res)
    setQrcode(res.data.qrCode);
  }

  const handleSubmitForm = async (e) => {
    console.log(e)
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="bg-slate-950">
      <NavBar />
      <Flex style={{ minHeight: "100vh" }} justify="center" align="center">
        <Form onFinish={handleSubmit}>
        <Form.Item>

          </Form.Item>
        </Form>
      </Flex>


      <Flex vertical={true} className="mt-5" justify="center" align="center">
        <img src="/logoIg.webp" width={'200px'} alt="" />
        <p className="text-xl">กรุณาใส่ข้อมูลเพื่อขึ้นจอให้กับคุณ</p>
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
              <Upload action="/upload.do" name="imageSlip" listType="picture-card">
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
              <button type="submit" className="butt">ยืนยัน</button>
            </Form.Item>
          </Form>
        </Flex>

      </Modal>
    </div>

  );
};

export default Screen;
