/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Image, Table, Tag } from "antd";
import { useEmployee } from "./Hook/useEmployee";
import { getImageUrl, getStatus } from "../../../Utils/Constant";
import { Link } from "react-router-dom";
import AddEmployee from "./components/addEmployee";

const Employee = () => {
  const { columns, dataList, openModel, setOpenModel } = useEmployee();

  const imageCustom = (value) => {
    return <Image src={getImageUrl(value)} />;
  };

  const statusCostom = (value) => {
    return (
      <Tag color={getStatus[value] == 1 ? "red" : "green"}>
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

  const showModal = () => {
    setOpenModel(true);
  };

  return (
    <>
      <h1>Employee List</h1>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={showModal}>
          Add Employee
        </button>
      </div>
      <AddEmployee openModel={openModel} setOpenModel={setOpenModel} />
      <Table
        columns={columns({
          imageCustom: imageCustom,
          statusCostom: statusCostom,
          renderActions: renderActions,
        })}
        dataSource={dataList}
        scroll={{
          x: 1500,
          y: 600,
        }}
      />
    </>
  );
};

export default Employee;
