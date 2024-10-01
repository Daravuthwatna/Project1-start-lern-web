import React, { useEffect, useState } from "react";
import { Modal, Button, Select, Form, Input, DatePicker } from "antd";
import baseService from "../../../../services/baseService";
import moment from "moment";
import { getImageLocalHost, getStatus } from "../../../../Utils/Constant";

const AddEmployee = ({ openModel, setOpenModel, edit, fetchData }) => {
  const [form] = Form.useForm();
  const [previewImg, setPreviewImg] = useState(null);

  const onFinish = async (values) => {
    if (edit.isEdit) {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("gender", values.gender);
      formData.append("dob", values.dob.format("YYYY-MM-DD"));
      formData.append("tel", values.tel);
      formData.append("email", values.email);
      formData.append("address", values.address);
      formData.append("status", values.status);
      formData.append("id", edit.data.id);
      formData.append("imageOld", edit.data.Image);
      const result = await baseService.put(
        `http://localhost:8000/api/employee/update`,
        formData,
        { "content-type": "multipart/form-data" }
      );

      if (result) {
        setOpenModel(false);
        fetchData();
      }
    } else {
      const formData = new FormData();
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("gender", values.gender);
      formData.append("dob", values.dob.format("YYYY-MM-DD"));
      formData.append("tel", values.tel);
      formData.append("email", values.email);
      formData.append("address", values.address);
      formData.append("status", values.status);
      formData.append("image", values.image);
      const result = await baseService.post(
        "http://localhost:8000/api/employee/create",
        formData,
        { "content-type": "multipart/form-data" }
      );
      if (result) {
        setOpenModel(false);
        fetchData();
      }
    }
  };

  useEffect(() => {
    if (edit.isEdit) {
      form.setFieldsValue({
        first_name: edit.data.FirstName,
        last_name: edit.data.LastName,
        gender: edit.data.Gender,
        dob: edit.data.Dob ? moment(edit.data.Dob) : null,
        tel: edit.data.Tel,
        email: edit.data.Email,
        address: edit.data.Address,
        status: getStatus[edit.data.Status],
        image: edit.data.Image,
      });
    }
  }, [edit, form]);

  const handleImage = (e) => {
    if (e.target.files[0]) {
      form.setFieldValue("image", e.target.files[0]);
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setPreviewImg(previewUrl);
    }
  };

  return (
    <Modal
      title={edit.isEdit ? "Edit Employee" : "Add Employee"}
      open={openModel}
      onCancel={() => {
        setOpenModel(false);
        form.resetFields();
        setPreviewImg(null);
      }}
      footer={null}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 6,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
        encType="multipart/from-data"
      >
        {/* // ========= FirstName ========= */}
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[
            {
              required: true,
              message: "Please input your First Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* // =========== LastName ========= */}
        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[
            {
              required: true,
              message: "Please input your Last Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* // =========== Gender ========= */}
        <Form.Item
          label="Gender"
          name="gender"
          rules={[
            {
              required: true,
              message: "Please select your Gender!",
            },
          ]}
        >
          <Select allowClear>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
        </Form.Item>
        {/* // =========== Date of Birth ========= */}
        <Form.Item
          label="Date of Birth"
          name="dob"
          rules={[
            {
              required: true,
              message: "Please input your Date of Birth!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        {/* // =========== Tel ========= */}
        <Form.Item
          label="Tel"
          name="tel"
          rules={[
            {
              required: true,
              message: "Please input your Tel!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* // =========== Email ========= */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        {/* // =========== Address ========= */}
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your Address!",
            },
          ]}
        >
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
        {/* // =========== Status ========= */}
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Please select your Status!",
            },
          ]}
        >
          <Select allowClear>
            <Select.Option value="1">Active</Select.Option>
            <Select.Option value="0">Inactive</Select.Option>
          </Select>
        </Form.Item>
        {/* // =========== Image ========= */}
        <Form.Item
          label="Image"
          name="image"
          rules={[
            {
              required: true,
              message: "Please select your Image!",
            },
          ]}
        >
          {/* // =========== Image Preview ========= */}
          {edit.isEdit && !previewImg && (
              <img
                style={{ width: "300px" }}
                src={getImageLocalHost(edit.data.Image)}
              />
            )}
            {previewImg && (
              <img style={{ width: "300px" }} src={previewImg} />
            )}
            <input type="file" onChange={handleImage} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 1,
          }}
        >
          <Button className="w-100" type="primary" htmlType="submit">
            {edit.isEdit ? "Update Employee" : "Add Employee"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEmployee;
