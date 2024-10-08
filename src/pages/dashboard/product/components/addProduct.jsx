import React, { useEffect, useMemo, useState } from "react";
import { Modal, Button, Select, Form, Input } from "antd";
import baseService from "../../../../services/baseService";
import { getStatus } from "../../../../Utils/Constant";

const addProduct = ({
  openModel,
  setOpenModel,
  edit,
  fetchData,
  categoryList,
}) => {
  const [form] = Form.useForm();
  const onFinish = async (value) => {
    value.status = Number(value.status);
    let statusValue = value.status;
    if (edit.isEdit) {
      const result = await baseService.put(
        `http://localhost:8000/api/product/update`,
        {
          ...value,
          updateBy: 66,
          createBy: 66,
          id: edit.data.id,
          status: statusValue,
        }
      );
      if (result) {
        setOpenModel(false);
        form.resetFields();
        fetchData();
      }
    } else {
      const result = await baseService.post(
        "http://localhost:8000/api/product/create",
        { ...value, createBy: 66, updateBy: 66 }
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
      form.setFieldValue("status", String(edit.data.Status));
      form.setFieldValue("name", edit.data.Name);
      form.setFieldValue("description", edit.data.Description);
      form.setFieldValue("id", edit.data.id);
      form.setFieldsValue({
        categoryId: edit.data.CategoryId,
        qty: edit.data.Qty,
        price: edit.data.Price,
        discountPercent: edit.data.DiscountPercent,
        discountPrice: edit.data.DiscountPrice,
        discountAmount: edit.data.DiscountAmount,
        netPrice: edit.data.NetPrice,
      });
    }
  }, [edit, form]);
  const listOption = useMemo(() => {
    return categoryList?.map((item) => ({
      value: item.id,
      label: item.Name,
    }));
  }, [categoryList]);

  return (
    <Modal
      title={edit.isEdit ? "Update Product" : "Add Product"}
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
        {/* Category */}
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select options={listOption} allowClear />
        </Form.Item>
        {/* Quantity */}
        <Form.Item
          label="Quantity"
          name="qty"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        {/* Price */}
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        {/* Dicount Persent */}
        <Form.Item
          label="Dicount Persent"
          name="discountPercent"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        {/* Dicount Persent */}
        <Form.Item
          label="Dicount Amount"
          name="discountAmount"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        {/* Net Price */}
        <Form.Item
          label="Net Price"
          name="netPrice"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
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
        {/* Submit Button */}
        <Form.Item>
          <Button className="w-100" type="primary" htmlType="submit">
            {edit.isEdit ? "Update Product" : "Add Product"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default addProduct;
