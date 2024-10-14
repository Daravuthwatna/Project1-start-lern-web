import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import baseService from "../../../../services/baseService";
import moment from "moment";

export const useCategory = () => {
  const [openModel, setOpenModel] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [parentList, setParentList] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [edit, setEdit] = useState({
    isEdit: false,
    data: {}
  })

  const pagination = useRef({
    current: 1,
    pageSize: 4,
    totalRecode: 0,
  });

  const columns = ({ imageCustom, statusCostom, action }) => {
    return [
      {
        title: "Name",
        width: 100,
        dataIndex: "Name",
        fixed: "left",
        key: "1",
      },
      {
        title: "Image",
        dataIndex: "Image",
        width: 100,
        fixed: "left",
        key: "2",
        render: (record, text, index) => imageCustom(text.Image),
      },
      {
        title: "Description",
        dataIndex: "Description",
        width: 500,
        key: "3",
      },
      {
        title: "Status",
        dataIndex: "Status",
        width: 50,
        key: "4",
        render: (text, record, index) => {
          return statusCostom(text);
        },
      },
      {
        title: "CreateAd",
        dataIndex: "CreateAd",
        width: 100,
        key: "5",
        render: (record, text, index) => {
          return moment(text.CreateAd).format("MMM-Do-YYYY");
        },
      },
      {
        title: "Action",
        fixed: "left",
        width: 50,
        key: "6",
        align: "center",
        fixed: "right",
        render: action,
      },
    ];
  };

  const fetchParentCategory = async () => {
    let API = "http://localhost:8000/api/category/get-list";
    const res = await baseService.get(API);
    setParentList(res.data);
  }
  
  const fetchData = async (search = "") => {
    let API = "http://localhost:8000/api/category/get-list";
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
    fetchParentCategory();
  }, [searchName]);

  const confirmDelete = async (id) => {
    const response = await baseService.delete(
      `http://localhost:8000/api/category/delete`,
      { id }
    );
    if (response) {
      fetchData();
    }
  };

  const handleDelete = (record, text, index) => {
    Modal.confirm({
      title: "Delete Category",
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
    parentList,
  };
};
