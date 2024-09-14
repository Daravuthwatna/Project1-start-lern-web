import React from "react";
import { Modal, Button, Select, Form, Input, DatePicker } from "antd";
import baseService from "../../../../services/baseService";

const AddEmployee = ({ openModel, setOpenModel }) => {

  const onFinish = (values) => {
    console.log("Success:", values);
    baseService.post("http://localhost:8000/api/employee/create", {
      ...values,
      dob: values.dob.format("YYYY-MM-DD")
    });

  };

  return (
    <Modal
      title="Add Employee"
      open={openModel}
      onCancel={() => setOpenModel(false)}
      footer={null}
    >
      <Form
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
        <Form.Item
          wrapperCol={{
            offset: 1,
          }}
        >
          <Button className="w-100" type="primary" htmlType="submit">
            Add Employee
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEmployee;
