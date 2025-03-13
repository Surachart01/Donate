import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Modal } from "antd";
import { Image , Input} from "antd";
import { Button } from "antd";
import Slip from "../images/015071213235BPM01495.jpeg";

const showModal = () => {
  setOpen(true);
};
const handleOk = () => {
  setOpen(false);
};

const handleCancel = () => {
  setOpen(false);
};

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
    title: "Status",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "yellow";
          if (tag === "complete") {
            color = "green";
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
        <Button
          type="primary"
          color="cyan"
          variant="solid"
          onClick={() => {
            Modal.confirm({
              title: "Confirm",
              content: (
                <div>
                  <p className="text-2xl">Name: {record.name}</p>
                  <p className="text-2xl">Text: {record.text}</p>
                  <Image src={record.slip} alt="Slip" width={300} />{" "}
                  {/* ✅ Show image inside Modal */}
                </div>
              ), // ✅ Use 'record.name' instead of 'data.name'
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
          color="primary"
          variant="solid"
          type="primary"
          onClick={() => {
            Modal.confirm({
              title: "Edit",
              content: (
                <div>
                  <div>
                    <p className="text-2xl">Name: </p>
                    <Input type="text" value={record.name}/>
                  </div>
                  <p className="text-2xl">Text: {record.text}</p>
                  <Image src={record.slip} alt="Slip" width={300} />{" "}
                  {/* ✅ Show image inside Modal */}
                </div>
              ), // ✅ Use 'record.name' instead of 'data.name'
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
    name: "toyo.pps",
    text: "ทดสอบๆนี่เสียงอะไรครับเนี่ย",
    slip: Slip, // Directly reference the imported image
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

const Admin = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="admin-container">
      <div className="p-12">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Admin;
