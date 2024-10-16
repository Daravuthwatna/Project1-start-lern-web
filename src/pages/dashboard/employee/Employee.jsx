import React from "react";
import { Image, Table, Tag, Input, Button } from "antd";
import { useEmployee } from "./Hook/useEmployee";
import { getStatus, getImageLocalHost } from "../../../Utils/Constant";
import { Link } from "react-router-dom";
import AddEmployee from "./components/addEmployee";
import useDebounce from "../../../Utils/useDebounce";

const Employee = () => {
  const {
    columns,
    dataList,
    openModel,
    setOpenModel,
    handleDelete,
    edit,
    setEdit,
    fetchData,
    searchName,
    setSearchName,
    pagination,
  } = useEmployee();

  const debounce = useDebounce();

  const imageCustom = (value) => {
    return (
      <Image
        style={{ width: "100px", height: "150px", objectFit: "cover" }}
        src={getImageLocalHost(value)}
      />
    );
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

  const passwordEdit = () => {
    return (
      <div className="d-flex justify-content-center">

      </div>
    )
  }

  const showModal = () => {
    setOpenModel(true);
  };

  return (
    <>
      <h1>Employee List</h1>
      <div className="container-fluid mb-4">
        <div className="row justify-content-between align-items-center">
          <div className="col-auto">
            <button className="btn btn-primary shadow-sm" onClick={showModal}>
              <i className="fa-solid fa-plus me-2"></i> Add Employee
            </button>
          </div>
          <div className="col-auto">
            <div className="input-group">
              <Input
                type="text"
                className="form-control"
                placeholder="Search employees..."
                value={searchName}
                onChange={(event) => {
                  setSearchName(event.target.value);
                  debounce(() => {
                    fetchData(event.target.value);
                  }, 2000);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <AddEmployee
        openModel={openModel}
        setOpenModel={(value) => {
          setOpenModel(value);
          setEdit({ isEdit: false, data: {} });
        }}
        edit={edit}
        fetchData={fetchData}
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
        }}
        onChange={(_pagination) => {
          pagination.current.current = _pagination.current;
          fetchData();
        }}
        pagination={{
          current: pagination.current.current,
          pageSize: pagination.current.pageSize,
          total: pagination.current.totalRecode,
        }}
      />
    </>
  );
};

export default Employee;
