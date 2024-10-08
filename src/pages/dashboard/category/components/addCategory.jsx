import React, { useEffect, useMemo, useState } from "react";
import { Modal, Button, Select, Form, Input } from "antd";
import baseService from "../../../../services/baseService";
import { getImageLocalHost, getStatus } from "../../../../Utils/Constant";

const AddCategory = ({
  openModel,
  setOpenModel,
  parentList,
  edit,
  fetchData,
}) => {
  const [form] = Form.useForm();
  const [previewImg, setPreviewImg] = useState(null);

  const onFinish = async (value) => {
    let statusValue = value.status;
    if (typeof statusValue === "string") {
      statusValue = Object.keys(getStatus).find(
        (key) => getStatus[key] === statusValue
      );
    }

    if (edit.isEdit) {
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("description", value.description);
      formData.append("status", value.status);
      formData.append("parentsId", value.parentsId);
      formData.append("image", value.image);
      formData.append("id", edit.data.id);
      formData.append("imageOld", edit.data.Image);
      const result = await baseService.put(
        `http://localhost:8000/api/category/update`,
        formData,
        { "content-type": "multipart/form-data" }
      );
      if (result) {
        setOpenModel(false);
        form.resetFields();
        fetchData();
      }
    } else {
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("description", value.description);
      formData.append("status", value.status);
      formData.append("parentsId", value.parentsId);
      formData.append("image", value.image);
      const result = await baseService.post(
        "http://localhost:8000/api/category/create",
        formData,
        { "content-type": "multipart/form-data" }
      );
      if (result) {
        setOpenModel(false);
        form.resetFields();
        fetchData();
      }
    }
  };

  useEffect(() => {
    if (edit.isEdit) {
      form.setFieldsValue({
        name: edit.data.Name,
        description: edit.data.Description,
        status: edit.data.Status,
        parentsId: edit.data.ParentsId,
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

  const listOption = useMemo(() => {
    return parentList?.map((item) => ({
      value: item.id,
      label: item.Name,
    }));
  }, [parentList]);

  return (
    <Modal
      title={edit.isEdit ? "Update Category" : "Add Category"}
      open={openModel}
      footer={null}
      onCancel={() => {
        setOpenModel(false);
      }}
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
        onFinish={onFinish}
        autoComplete="off"
      >
        {/* Name */}
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Description */}
        <Form.Item label="Description" name="description">
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>

        {/* Status */}
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select allowClear>
            <Select.Option value="1">Active</Select.Option>
            <Select.Option value="0">Inactive</Select.Option>
          </Select>
        </Form.Item>

        {/* Parent */}
        <Form.Item label="Parent" name="parentsId">
          <Select options={listOption} allowClear />
        </Form.Item>

        {/* Image */}
        <Form.Item
          label="Image"
          name="image"
          rules={[
            {
              required: true,
            },
          ]}
        >
          {/* Image Preview */}
          {edit.isEdit && !previewImg && (
            <img
              style={{ width: "300px" }}
              src={getImageLocalHost(edit.data.Image)}
            />
          )}
          {previewImg && <img style={{ width: "300px" }} src={previewImg} />}
          <input type="file" onChange={handleImage} />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button className="w-100" type="primary" htmlType="submit">
            {edit.isEdit ? "Update Category" : "Add Category"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategory;
