/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

const Footer = () => {
  const { allCategory } = useContext(ProductContext);
  if (!allCategory.listAll) {
    return null;
  }
  return (
    <footer className="bg-light text-center mt-4 text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h1 className="text-uppercase text-primary">T-SALE.COM</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae,
              saepe. Maiores vitae praesentium laborum ducimus error blanditiis,
              sint qui nobis, nisi provident exercitationem magnam corrupti
              amet, id quidem placeat dolorem.
            </p>
            <p className="mb-0 me-3">
              <i className="fa-solid fa-phone text-primary"></i> +315 12 986 239 /{" "}
              <i className="fa-brands fa-telegram text-primary"></i> +911 10 917 911
            </p>
          </div>
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0 text-center">
            <h4 className="text-uppercase text-primary">Category</h4>
            <ul className="list-unstyled">
              {allCategory.listAll
                .filter((category) => category.ParentsId == 0)
                .map((category) => (
                  <li key={category.Id}>
                    <Link className="text-dark nav-link" to={`/web/category?categoryId=${category.Id}`}>
                      {category.Name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3 bg-light">
        © 2024 Copyright:{" "}
          <Link className="=" to="/web">
          T-SALE.COM
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
