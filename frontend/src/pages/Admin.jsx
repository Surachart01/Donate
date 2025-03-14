import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Modal, Image, Input, Button, Form, notification } from "antd";
import { deleteDonate, editDonate, getDonateByStatus } from "../service/api";

const Admin = () => {
  const [dataTable, setDataTable] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [editingDesc, setEditingDesc] = useState("");
  const [state , setState] = useState(false)

  useEffect(() => {
    if (selectedRecord) {
      setEditingName(selectedRecord.name);
      setEditingDesc(selectedRecord.text);
    }
  }, [selectedRecord]);

  const handleSubmit = async (data) => {
console.log(data)
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
      console.log(res)
      if (res.status == 200) {
        setOpenEditModal(false);
        fetchData();
        notification.success({
          message: "แก้ไขข้อมูลเสร็จสิ้น"
        })
      } else {
        setOpenEditModal(false);
        fetchData();
        notification.error({
          message: "เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้ง"
        })
      }

      window.location.reload()
    } catch (error) {
      console.error("Error updating data:", error);
      notification.error({
        message: "เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้ง"
      })
      window.location.reload()
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
          message: "แก้ไขข้อมูลเสร็จสิ้น"
        })
      } else {
        notification.error({
          message: "เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้ง"
        })
      }
      window.location.reload()
    } catch (error) {
      console.error("Error updating data:", error);
      notification.error({
        message: "เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้ง"
      })
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
            <Tag color={tag === "complete" ? "green" : "yellow"} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          ))}
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
            style={{ backgroundColor: "green", borderColor: "green" }}
            onClick={() => {
              Modal.confirm({
                title: "ตรวจสอบข้อมูล",
                content: (
                  <div>
                    <Image src={record.slip} alt="Slip" width={300} />
                    <p className="text-xl">ชื่อ: {record.name}</p>
                    <p className="text-xl">รายละเอียด: {record.text}</p>
                  </div>
                ),
                onOk: () => {
                  console.log(record)
                  handleSubmit(record)
                  
                },
              });
            }}
          >
            ยืนยัน
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#b38902" }}
            onClick={() => {
              setSelectedRecord(record);
              setOpenEditModal(true);
            }}
          >
            แก้ไข
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "red" }}
            onClick={() => {
              Modal.confirm({
                title: "ลบข้อมูล",
                content: (
                  <div>
                    <p>คุณต้องการลบข้อมูลนี้หรือไม่?</p>
                    <p><b>ชื่อ:</b> {record.name}</p>
                    <p><b>รายละเอียด:</b> {record.text}</p>
                  </div>
                ),
                onOk: async () => {
                  const res = await deleteDonate(record.key._id);
                  console.log(res)
                  if (res.status == 200) {
                    notification.success({
                      message: "ลบข้อมูลเสร็จสิ้น"
                    })
                  } else {
                    notification.error({
                      message: "เกิดข้อผิดพลาด"
                    })
                  }
                  window.location.reload();
                },
              });
            }}
          >
            ลบ
          </Button>
        </Space>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const res = await getDonateByStatus("Pendding");
      const formattedData = (res.data?.data || []).map((data) => ({
        key: { _id: data._id, image: data.imageUrl, dateTime: data.dateTime, sec: data.sec },
        name: data.igName,
        text: data.description,
        sec: `${data.sec} วินาที`,
        slip: data.slipUrl,
        tags: [data.status],
      }));

      setDataTable(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setState(false)
    fetchData();
  }, [state]);
  return (
    <div className="admin-container">
      <div className="p-12">
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
            <Button htmlType="submit" type="primary">ยืนยัน</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Admin;
