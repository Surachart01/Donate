import React, { useState } from "react";
import IG from "../images/instagram-logo-instagram-icon-transparent-free-png.webp";
import { Flex, Form } from 'antd'
import NavBar from "../components/NavBar";

const Screen = () => {
  const [modal , setModal] = useState();

  const handleSubmit = (e) => {
    
  }
  return (
    <div className="bg-slate-950">
      <NavBar />
      <Flex style={{ minHeight: "100vh" }} justify="center" align="center">
        <Form onFinish={handleSubmit}>
        <Form.Item
        >

        </Form.Item>
        </Form>
      </Flex>
    </div>

  );
};

export default Screen;
