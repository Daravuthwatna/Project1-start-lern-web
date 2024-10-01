import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import baseService from "../../../../services/baseService";

export const useEmployee = () => {
  const [fixdTop, setFixedTop] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [edit, setEdit] = useState({
    isEdit: false,
    data: {},
  });

  const pagination = useRef({
    current: 1,
    pageSize: 3,
    totalRecode: 10,
  });

  const columns = ({ imageCustom, statusCostom, action }) => {
    return [
      {
        title: "Name",
        width: 200,
        dataIndex: "FirstName",
        key: "FirstName",
        fixed: "left",
        render: (record, text, index) => {
          return `${text.FirstName} ${text.LastName}`;
        },
      },
      {
        title: "Image",
        dataIndex: "Image",
        key: "1",
        width: 150,
        render: (record, text, index) => imageCustom(text.Image),
      },
      {
        title: "Gender",
        dataIndex: "Gender",
        key: "2",
        width: 100,
      },
      {
        title: "Date of Birth",
        dataIndex: "Dob",
        key: "4",
        width: 150,
        render: (record, text, index) => {
          return moment(text.Dob).format("MMM-Do-YYYY");
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
        width: 200,
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
        width: 100,
        render: (text, record, index) => {
          return statusCostom(text);
        },
      },
      {
        title: "CreateAt",
        dataIndex: "CreateAt",
        key: "9",
        width: 150,
        render: (record, text, index) => {
          return moment(text.CreateAt).format("MMM-Do-YYYY");
        },
      },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width:100,
        render: action,
      },
    ];
  };

  const fetchData = async (search = "") => {
    let API = "http://localhost:8000/api/employee/get-list";
    API += `?page=${pagination.current.current}&limit=${pagination.current.pageSize}`;
    if (search) {
      API += `&search_name=${search}`;
    }
    const response = await baseService.get(API);
    setDataList(response.data);
    pagination.current.totalRecord = response.data.totalRecord;
  };

  useEffect(() => {
    fetchData();
  }, [searchName]);

  const confirmDelete = async (id) => {
    const response = await baseService.delete(
      `http://localhost:8000/api/employee/delete`,
      { id }
    );
    if (response) {
      fetchData();
    }
  };

  const handleDelete = (record, text, index) => {
    Modal.confirm({
      title: "Delete Employee",
      content: "Are you sure you want to delete!",
      onOk: () => confirmDelete(record.id),
      onCancel: () => {},
    });
    console.log(record);
  };

  return {
    columns,
    fixdTop,
    setFixedTop,
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
  };
};
