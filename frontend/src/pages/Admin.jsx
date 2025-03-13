import React, { useState } from "react";
import { Space, Table, Tag, Modal, Image, Input, Button } from "antd";
import Slip from "../images/015071213235BPM01495.jpeg";

const Admin = () => {
  const [open, setOpen] = useState(false);
  const [editingName, setEditingName] = useState(""); // ✅ Define state for the name input

  const columns = [
    {
      title: "Username",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Slip",
      dataIndex: "slip",
      key: "slip",
      render: (slip) => <Image src={slip} alt="Slip" width={100} />,
    },
    {
      title: "Status",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag === "complete" ? "green" : tag.length > 5 ? "geekblue" : "yellow";
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            cyan
            onClick={() => {
              Modal.confirm({
                title: "Confirm",
                content: (
                  <div>
                    <p className="text-2xl">Name: {record.name}</p>
                    <p className="text-2xl">Text: {record.text}</p>
                    <Image src={record.slip} alt="Slip" width={300} />
                  </div>
                ),
                footer: (_, { OkBtn, CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <OkBtn />
                  </>
                ),
              });
            }}
          >
            Accept
          </Button>
          <Button
            type="primary"
            onClick={() => {// ✅ Set name when opening the modal
              Modal.confirm({
                title: "Edit",
                content: (
                  <div>
                    <p className="text-2xl">Name:</p>
                    <Input
                      type="text"
                      value={record.name}
                      onChange={(e) => setEditingName(e.target.value)}
                    />
                    <p className="text-2xl">Text: {record.text}</p>
                    <Image src={record.slip} alt="Slip" width={300} />
                  </div>
                ),
                footer: (_, { OkBtn, CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <OkBtn />
                  </>
                ),
              });
            }}
          >
            Edit
          </Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "toyo.pps",
      text: "ทดสอบๆนี่เสียงอะไรครับเนี่ย",
      slip: Slip,
      tags: ["pending"],
    },
    {
      key: "2",
      name: "tle_src",
      text: "หะอะไรนะครับ ผม งง อะ",
      slip: Slip,
      tags: ["show"],
    },
    {
      key: "3",
      name: "Joe Black",
      text: "ทดสอบระบบกินตังค์หน่อยครับ",
      slip: Slip,
      tags: ["complete"],
    },
  ];

  return (
    <div className="admin-container">
      <div className="p-12">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Admin;
