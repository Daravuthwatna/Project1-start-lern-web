/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect, useState } from "react";
import baseService from "../../../../services/baseService";

export const useEmployee = () => {
  const [fixdTop, setFixedTop] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [openModel, setOpenModel] = useState(false);

  const columns = ({ imageCustom, statusCostom, renderActions, openModel, setOpenModel }) => {
    return [
      {
        title: "Name",
        width: 150,
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
        render: (record, text, index) => imageCustom(text.eImage),
      },
      {
        title: "Gender",
        dataIndex: "Gender",
        key: "2",
        width: 150,
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
        width: 150,
        render: (record, text, index) => renderActions(text.Id),
      },
    ];
  };

  const fetchData = async () => {
    const response = await baseService.get("http://localhost:8000/api/employee/get-list");
    setDataList(response.data);
  };

  useEffect(()=>{
    fetchData();
  },[])

  return { columns, fixdTop, setFixedTop, dataList, openModel, setOpenModel };
};