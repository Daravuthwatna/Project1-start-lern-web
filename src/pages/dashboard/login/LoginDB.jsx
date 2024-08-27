/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import loginPNG from "../../../assets/image/login-concept-illustration_11436.webp";
import LocalStorage from "../../../Utils/LocalStorage";
import baseService from "../../../services/baseService";

const LoginDB = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await baseService.post(
        "https://piseth.site/api/employee/login",
        values
      );
      if (response) {
        LocalStorage.setUserInfo(response);
        setTimeout(() => {
          localStorage.clear("login");
          message.info("Session expired. Please log in again.");
          navigate("/dashboard/login");
        }, 1800000);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Something went wrong. Please try again.");
    }
  };

  const onFinish = (values) => {
    handleLogin(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12 shadow-lg p-4 bg-white rounded">
          <div className="row align-items-center">
            <div className="col-lg-6 d-none d-lg-block">
              <img
                src={loginPNG}
                alt="Login Illustration"
                className="img-fluid"
              />
            </div>
            <div className="col-lg-6 col-md-12">
              <h1
                className="mb-4 text-center text-primary"
                style={{ fontWeight: "bold" }}
              >
                Login
              </h1>
              <Form
                name="basic"
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                style={{
                  maxWidth: 400,
                  margin: "0 auto",
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input placeholder="Username" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="w-100">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginDB;
