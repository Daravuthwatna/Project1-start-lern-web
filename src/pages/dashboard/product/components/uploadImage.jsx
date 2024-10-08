import { Button, Form, Modal, Upload } from "antd";
import React, { useState } from "react";

const UploadImage = ({ openModelUpload, setOpenModelUpload }) => {
  const [form] = Form.useForm();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const onFinish = (values) => {
    setOpenModelUpload(false);
  };

  const handleUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + selectedFiles.length > 3) {
      message.error("You can only upload a maximum of 5 images.");
      form.setFields([
        {
          name: "images",
          errors: ["limit only 3"],
        },
      ]);
      return;
    }
    const newSelectedFiles = [...selectedFiles, ...files];
    setSelectedFiles(newSelectedFiles);

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
      <Form onFinish={onFinish}>
        <Form.Item
          name="image"
          label="Select Image"
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <input type="file" onChange={handleUpload} />
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
