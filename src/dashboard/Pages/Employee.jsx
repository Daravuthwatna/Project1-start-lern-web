/* eslint-disable no-unused-vars */
import React from "react";
import { Image, Table, Tag } from "antd";
import { employee } from "../../assets/employee";
import { getGender, getImageUrl, getRole, getStatus } from "../Utils/Constant";
import moment from "moment";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "Name",
    width: 150,
    dataIndex: "FirstName",
    key: "FirstName",
    fixed: "left",
    render: (record, text, index) => {
      return `${text.FirstName}${" "}${text.LastName}`;
    },
  },
  {
    title: "Image",
    dataIndex: "Image",
    key: "1",
    width: 150,
    render: (record, text, index) => (
      <Image className="w-75 d-block mx-auto" src={getImageUrl(text.Image)} />
    ),
  },
  {
    title: "Gender",
    dataIndex: "Gender",
    key: "2",
    width: 150,
    render: (text, record, index) => getGender[text],
  },
  {
    title: "Role",
    dataIndex: "RoleId",
    key: "3",
    width: 150,
    render: (text, record, index) => getRole[text],
  },
  {
    title: "Date of Birth",
    dataIndex: "Dob",
    key: "4",
    width: 150,
    render: (text, record, index) => {
      return moment(text).format("MMM-Do-YYYY");
    },
  },
  {
    title: "Tel",
    dataIndex: "Tel",
    key: "5",
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "Email",
    key: "6",
    width: 150,
  },
  {
    title: "Address",
    dataIndex: "Address",
    key: "7",
    width: 150,
  },
  {
    title: "Status",
    dataIndex: "Status",
    key: "8",
    width: 150,
    render: (text, record, index) => {
      return <Tag color={getStatus[text] === 1 ? "red" : "success"}>{getStatus[text]}</Tag>;
    },
  },
  {
    title: "CreateAt",
    dataIndex: "CreateAt",
    key: "9",
    width: 150,
    render: (text, record, index) => {
      return moment(text).format("MMM-Do-YYYY");
    },
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 150,
    render: () => {
      return (
        <div className="d-flex justify-content-center">
          <Link className="mx-3 text-success">
            <i className="fa-solid fa-pen-to-square"></i>
          </Link>
          <Link className="mx-3 text-danger">
            <i className="fa-solid fa-trash"></i>
          </Link>
        </div>
      );
    },
  },
];
const Employee = () => (
  <Table
    columns={columns}
    dataSource={employee.list}
    scroll={{
      x: 1500,
      y: 600,
    }}
  />
);
export default Employee;
