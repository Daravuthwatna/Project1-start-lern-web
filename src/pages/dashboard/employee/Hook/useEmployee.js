/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect, useState } from "react";
import { getGender, getRole } from "../../../../Utils/Constant";
import baseService from "../../../../services/baseService";

export const useEmployee = () => {
  const [fixdTop, setFixedTop] = useState(false);

  const columns = ({ imageCustom, statusCostom, renderActions }) => {
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
        render: (record, text, index) => imageCustom(text.Image),
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
        render: (record, text, index) => {
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
          return statusCostom(text);
        },
      },
      {
        title: "CreateAt",
        dataIndex: "CreateAt",
        key: "9",
        width: 150,
        render: (record, text, index) => {
          return moment(text).format("MMM-Do-YYYY");
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
    const response = await baseService.get("https://piseth.site/api/employee/get-list?pageSize=5&page=1");
    console.log(response);
  };

  useEffect(()=>{
    fetchData();
  },[])

  return { columns, fixdTop, setFixedTop };
};