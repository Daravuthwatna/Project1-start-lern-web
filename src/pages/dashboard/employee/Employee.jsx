/* eslint-disable no-unused-vars */
import React from "react";
import { Image, Table, Tag } from "antd";
import { employee } from "../../../data/employee";
import { useEmployee } from "./Hook/useEmployee";
import { getImageUrl, getStatus } from "../../../Utils/Constant";
import { Link } from "react-router-dom";

const Employee = () => {
  const { columns } = useEmployee();
  const imageCustom = (value) => {
    return <Image src={getImageUrl(value)} />;
  };
  const statusCostom = (value) => {
    return (
      <Tag color={getStatus[value] === 1 ? "red" : "success"}>
        {getStatus[value]}
      </Tag>
    );
  };
  const renderActions = (id) => {
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
  };
  return (
    <Table
      columns={columns({
        imageCustom: imageCustom,
        statusCostom: statusCostom,
        renderActions: renderActions
      })}
      dataSource={employee.list}
      scroll={{
        x: 1500,
        y: 600,
      }}
    />
  );
};

export default Employee;
