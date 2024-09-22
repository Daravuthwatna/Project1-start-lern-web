/* eslint-disable no-unused-vars */
import React from "react";
import { Image, Table, Tag } from "antd";
import { useEmployee } from "./Hook/useEmployee";
import { getStatus, getImageLocalHost } from "../../../Utils/Constant";
import { Link } from "react-router-dom";
import AddEmployee from "./components/addEmployee";

const Employee = () => {
  const {
    columns,
    dataList,
    openModel,
    setOpenModel,
    handleDelete,
    edit,
    setEdit,
  } = useEmployee();

  const imageCustom = (value) => {
    return <Image style={{width: "100px" , height: "150px", objectFit: "cover"}} src={getImageLocalHost(value)} />;
  };

  const statusCostom = (value) => {
    return (
      <Tag color={getStatus[value] == 1 ? "red" : "green"}>
        {getStatus[value]}
      </Tag>
    );
  };

  const action = (record) => {
    return (
      <div className="d-flex justify-content-center">
        <Link
          onClick={() => {
            setEdit({ isEdit: true, data: record });
            setOpenModel(true);
          }}
          className="mx-3 text-success"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </Link>
        <Link onClick={() => handleDelete(record)} className="mx-3 text-danger">
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
      <AddEmployee
        openModel={openModel}
        setOpenModel={(value) => {
          setOpenModel(value);
          setEdit({ isEdit: false, data: {} });
        }}
        edit={edit}
      />
      <Table
        columns={columns({
          imageCustom: imageCustom,
          statusCostom: statusCostom,
          action: action,
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
