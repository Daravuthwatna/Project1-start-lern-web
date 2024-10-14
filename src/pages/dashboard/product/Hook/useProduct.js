import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import baseService from "../../../../services/baseService";
import moment from "moment";

export const useProduct = () => {
  const [openModel, setOpenModel] = useState(false);
  const [openModelUpload, setOpenModelUpload] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [edit, setEdit] = useState({
    isEdit: false,
    data: {},
  });
  const [uploadProductId, setUploadProductId] = useState(0);

  const pagination = useRef({
    current: 1,
    pageSize: 4,
    totalRecode: 0,
  });

  const columns = ({ statusCostom, action, imageCustom }) => {
    return [
      {
        title: "N",
        width: 100,
        dataIndex: "N",
        fixed: "left",
        render: (record, text, index) => index + 1,
      },
      {
        title: "Name",
        width: 110,
        dataIndex: "Name",
        fixed: "left",
      },
      {
        title: "Image",
        dataIndex: "image",
        key: "1",
        width: 150,
        render: (record, text, index) => imageCustom(text.Image),
      },
      {
        title: "Description",
        dataIndex: "Description",
        width: 400,
      },
      {
        title: "Quantity",
        dataIndex: "Qty",
        width: 100,
      },
      {
        title: "Price",
        dataIndex: "Price",
        width: 100,
      },
      {
        title: "DiscountPercent",
        dataIndex: "DiscountPercent",
        width: 150,
      },
      {
        title: "DiscountAmount",
        dataIndex: "DiscountAmount",
        width: 150,
      },
      {
        title: "NetPrice",
        dataIndex: "NetPrice",
        width: 100,
      },
      {
        title: "CreateBy",
        dataIndex: "CreateBy",
        width: 100,
      },
      {
        title: "Status",
        dataIndex: "Status",
        width: 100,
        render: (text, record, index) => {
          return statusCostom(text);
        },
      },
      {
        title: "CreateAd",
        dataIndex: "CreateAd",
        width: 150,
        render: (record, text, index) => {
          return moment(text.CreateAd).format("MMM-Do-YYYY");
        },
      },
      {
        title: "Action",
        fixed: "left",
        width: 200,
        align: "center",
        fixed: "right",
        render: action,
      },
    ];
  };

  const fetchCategory = async () => {
    let API = "http://localhost:8000/api/category/get-list";
    const res = await baseService.get(API);
    setCategoryList(res.data);
  };

  const fetchData = async (search = "") => {
    let API = "http://localhost:8000/api/product/get-list";
    API += `?page=${pagination.current.current}&limit=${pagination.current.pageSize}`;
    if (search) {
      API += `&search_name=${search}`;
    }

    const res = await baseService.get(API);
    setDataList(
      res.data.map((item) => {
        return {
          ...item,
          key: item.id,
        };
      })
    );
    pagination.current.totalRecode = res.totalRecord;
  };

  useEffect(() => {
    fetchData();
    fetchCategory();
  }, [searchName]);

  const confirmDelete = async (id) => {
    const response = await baseService.delete(
      `http://localhost:8000/api/product/delete`,
      { id }
    );
    if (response) {
      fetchData();
    }
  };

  const handleDelete = (record, text, index) => {
    Modal.confirm({
      title: "Delete Product",
      content: "Are you sure you want to delete!",
      onOk: () => confirmDelete(record.id),
      onCancel: () => {},
    });
    console.log(record);
  };
  return {
    openModel,
    setOpenModel,
    dataList,
    columns,
    fetchData,
    edit,
    setEdit,
    handleDelete,
    searchName,
    setSearchName,
    pagination,
    categoryList,
    openModelUpload,
    setOpenModelUpload,
    uploadProductId,
    setUploadProductId,
  };
};
