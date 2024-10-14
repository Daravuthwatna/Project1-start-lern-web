import { Button, Form, Modal, message } from "antd";
import React, { useState } from "react";
import baseService from "../../../../services/baseService";

const UploadImage = ({
  openModelUpload,
  setOpenModelUpload,
  uploadProductId,
}) => {
  const [form] = Form.useForm();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const onFinish = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("image", file);
    });
    formData.append("productId", uploadProductId);
    formData.append("updateBy", 66);
    formData.append("createBy", 66);
    const result = await baseService.post(
      `http://localhost:8000/api/product/upload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    console.log(result);
  };

  const handleUpload = (event) => {
    const files = Array.from(event.target.files);
    const newSelectedFiles = [...selectedFiles, ...files];

    if (files.length + selectedFiles.length > 3) {
      message.error("You can only upload a maximum of 3 images.");
      form.setFields([
        {
          name: "images",
          errors: ["limit only 3"],
        },
      ]);
      return;
    }
    setSelectedFiles(newSelectedFiles);
    form.setFieldValue("images", newSelectedFiles);
    const previews = newSelectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  return (
    <Modal
      title="Upload Image"
      open={openModelUpload}
      onCancel={() => setOpenModelUpload(false)}
      footer={null}
      width={600}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="images"
          label="Select Image"
          rules={[{ required: true }]}
        >
          <input
            multiple
            accept="image/*"
            type="file"
            onChange={handleUpload}
          />
          <div>
            {imagePreviews.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {imagePreviews.map((preview, index) => (
                  <div key={index} style={{ margin: "10px" }}>
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Form.Item>
        <Form.Item>
          <Button className="w-100" type="primary" htmlType="submit">
            Upload Image
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UploadImage;
