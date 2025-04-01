import React from "react";
import { useEffect, useState } from "react";
import {
  Space,
  Table,
  Tag,
  Modal,
  Image,
  Input,
  Button,
  Form,
  notification,
} from "antd";
import { deleteDonate, editDonate, getDonateByStatus } from "../service/api";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const History = () => {
  const [dataTable, setDataTable] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [editingDesc, setEditingDesc] = useState("");
  const [state, setState] = useState(false);
  const [authData, setAuthData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRecord) {
      setEditingName(selectedRecord.name);
      setEditingDesc(selectedRecord.text);
    }
  }, [selectedRecord]);

  const handleSubmit = async (data) => {
    let formData = new FormData();
    formData.append("igName", data.name);
    formData.append("description", data.text);
    formData.append("status", "Complete");
    formData.append("imageUrl", data.key.image);
    formData.append("slipUrl", data.slip);
    formData.append("dateTime", data.key.dateTime);
    formData.append("sec", data.key.sec);

    try {
      const res = await editDonate(data.key._id, formData);
      if (res.status == 200) {
        setOpenEditModal(false);
        fetchData();
        notification.success({
          message: "แก้ไขข้อมูลเสร็จสิ้น",
        });
      } else {
        setOpenEditModal(false);
        fetchData();
        notification.error({
          message: "เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้ง",
        });
      }

      window.location.reload();
    } catch (error) {
      console.error("Error updating data:", error);
      notification.error({
        message: "เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้ง",
      });
      window.location.reload();
    }
  };
  const handleEdit = async () => {
    if (!selectedRecord) return;

    let formData = new FormData();
    formData.append("igName", editingName);
    formData.append("description", editingDesc);
    formData.append("status", selectedRecord.tags[0]);
    formData.append("imageUrl", selectedRecord.key.image);
    formData.append("slipUrl", selectedRecord.slip);
    formData.append("dateTime", selectedRecord.key.dateTime);
    formData.append("sec", selectedRecord.key.sec);

    try {
      const res = await editDonate(selectedRecord.key._id, formData);
      if (res.status == 200) {
        notification.success({
          message: "แก้ไขข้อมูลเสร็จสิ้น",
        });
      } else {
        notification.error({
          message: "เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้ง",
        });
      }
      window.location.reload();
    } catch (error) {
      console.error("Error updating data:", error);
      notification.error({
        message: "เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้ง",
      });
    }
  };

  const columns = [
    {
      title: "ชื่อ Instagram",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "รายละเอียด",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "สลิป",
      dataIndex: "slip",
      key: "slip",
      render: (slip) => <Image src={slip} alt="Slip" width={100} />,
    },
    {
      title: "เวลาแสดง",
      dataIndex: "sec",
      key: "sec",
    },
    {
      title: "Status",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => (
            <Tag color={tag === "showed" ? "yellow" : "green"} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const res = await getDonateByStatus("Showed");
      const formattedData = (res.data?.data || []).map((data) => ({
        key: {
          _id: data._id,
          image: data.imageUrl,
          dateTime: data.dateTime,
          sec: data.sec,
        },
        name: data.igName,
        text: data.description,
        sec: `${data.sec} วินาที`,
        slip: data.slipUrl,
        tags: [data.status],
      }));
      console.log(formattedData);

      setDataTable(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const auth = () => {
    const authDatax = JSON.parse(localStorage.getItem("auth"));
    if (authDatax) {
      setAuthData(authDatax);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchData();
    auth();
  }, []);

  useEffect(() => {
    setState(false);
    fetchData();
  }, [state]);

  return (
    <>
      <AdminNavbar
        displayName={authData?.displayName}
        photoURL={authData?.photoURL}
      />
      <div className="admin-container">
        <div className="p-12">
          <div className="flex justify-center mb-5 text-3xl text-black">
            <p>History</p>
          </div>
          <Table columns={columns} dataSource={dataTable} />
        </div>

        <Modal
          title="แก้ไขข้อมูล"
          open={openEditModal}
          onCancel={() => setOpenEditModal(false)}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleEdit}>
            <Form.Item label="ชื่อ Instagram">
              <Input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="รายละเอียด">
              <Input
                value={editingDesc}
                onChange={(e) => setEditingDesc(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                ยืนยัน
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default History;
