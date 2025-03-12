import React from "react";
import { Space, Table, Tag } from "antd";
import { Image } from 'antd';
import { Button } from "antd";
import Slip from "../images/015071213235BPM01495.jpeg";

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
    render: (slip) => <Image src={slip} alt="Slip" width={100} />, // Renders image
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
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
        <Button color="cyan" variant="solid">
            Accept
          </Button>
        <Button color="primary" variant="solid">
            Edit
          </Button>
        <Button color="danger" variant="solid">
            Delete
          </Button>
        
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    text: "ทดสอบๆนี่เสียงอะไรครับเนี่ย",
    slip: Slip, // Directly reference the imported image
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    text: "หะอะไรนะครับ ผม งง อะ",
    slip: Slip,
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    text: "ทดสอบระบบกินตังค์หน่อยครับ",
    slip: Slip,
    tags: ["cool", "teacher"],
  },
];

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="p-12">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Admin;
