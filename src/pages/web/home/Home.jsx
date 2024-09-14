/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ListCategory from "./ListCategory.jsx";
import ListProduct from "./ListProduct.jsx";
import Slide from "../../../components/slide.jsx";
import ScrollUp from "../../../components/ScrollUp.jsx";
import { Skeleton } from "antd";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const simulateLoading = () => {
    setLoading(false);
  };
  setTimeout(simulateLoading, 2000);

  return (
    <div className="container">
      <ScrollUp/>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
          <Slide />
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
          {loading ? (
            <Skeleton active paragraph={{ rows: 4 }} />
          ) : (
            <ListCategory />
          )}
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
          {loading ? (
            <Skeleton active paragraph={{ rows: 4 }} />
          ) : (
            <ListProduct />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
