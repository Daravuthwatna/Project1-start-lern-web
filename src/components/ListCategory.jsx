/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

const ListCategory = () => {
  const { allCategory } = useContext(ProductContext);
  
  return (
    <div className="container-fluid">
      <h1 className="mt-5 text-primary">Category</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mt-1">
        {allCategory.list && allCategory.list
          .filter((category) => category.ParentsId == 0)
          .map((category) => (
            <div className="col" key={category.Id}>
              <div className="card h-100">
                <img
                  src={`https://piseth.site/api/get-image/${category.Image}`}
                  className="card-img-top img-fluid"
                  alt={category.Name}
                  style={{
                    width: "100%",
                    height: "11rem",
                    objectFit: "contain",
                  }}
                />
                <div className="card-body">
                  <Link to={`/category/${category.Id}`}>
                    <button className="btn btn-primary w-100 card-text">
                      {category.Name}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListCategory;
