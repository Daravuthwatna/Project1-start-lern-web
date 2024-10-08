import React from "react";
import { Image, Table, Tag, Input, Button } from "antd";
import AddProduct from "./components/addProduct.jsx";
import UploadImage from "./components/uploadImage.jsx";
import { getImageLocalHost, getStatus } from "../../../Utils/Constant.js";
import { Link } from "react-router-dom";
import { useProduct } from "./Hook/useProduct.js";
import useDebounce from "../../../Utils/useDebounce";

const Product = () => {
  const {
    openModel,
    setOpenModel,
    columns,
    dataList,
    fetchData,
    edit,
    setEdit,
    handleDelete,
    categoryList,
    searchName,
    setSearchName,
    pagination,
    openModelUpload,
    setOpenModelUpload,
  } = useProduct();

  const debounce = useDebounce();

  const imageCustom = (value) => {
    return (
      <Image
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
        src={getImageLocalHost(value)}
      />
    );
  };

  const statusCostom = (value) => {
    return (
      <Tag color={getStatus[value] === 1 ? "red" : "green"}>
        {getStatus[value]}
      </Tag>
    );
  };

  const action = (record) => {
    return (
      <div className="d-flex justify-content-center">
        <Button onClick={showModalUpload}>Upload Image</Button>
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

  const showModalUpload = () => {
    setOpenModelUpload(true);
  };

  return (
    <>
      <h1>Product List</h1>
      <div className="container-fluid mb-4">
        <div className="row justify-content-between align-items-center">
          <div className="col-auto">
            <button className="btn btn-primary shadow-sm" onClick={showModal}>
              <i className="fa-solid fa-plus me-2"></i> Add Product
            </button>
          </div>
          <div className="col-auto">
            <div className="input-group">
              <Input
                type="text"
                className="form-control"
                placeholder="Search Product..."
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
      <AddProduct
        openModel={openModel}
        setOpenModel={(value) => {
          setOpenModel(value);
          setEdit({ isEdit: false, data: {} });
        }}
        edit={edit}
        fetchData={fetchData}
        productList={dataList}
        categoryList={categoryList}
      />
      <UploadImage
        openModelUpload={openModelUpload}
        setOpenModelUpload={setOpenModelUpload}
      />
      <Table
        columns={columns({
          imageCustom: imageCustom,
          statusCostom: statusCostom,
          action: action,
        })}
        dataSource={dataList}
        scroll={{ x: 2000 }}
        pagination={{
          current: pagination.current.current,
          pageSize: pagination.current.pageSize,
          total: pagination.current.totalRecode,
        }}
        onChange={(_pagination) => {
          pagination.current.current = _pagination.current;
          fetchData();
        }}
      />
    </>
  );
};

export default Product;