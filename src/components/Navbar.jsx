/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { Avatar, Badge } from "antd";

const Navbar = () => {
  const { allCategory } = useContext(ProductContext);
  if (!allCategory.listAll) {
    return null;
  }
  return (
    <>
      <div className="container-fluid bg-light">
        <div className="row">
          <p className="mt-2 mb-2 text-end">
            <i className="fa-solid fa-phone text-primary"></i>+315 12 986 239 /{" "}
            <i className="fa-brands fa-telegram text-primary"></i> +911 10 917
            911
          </p>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg mb-5 navbar-light bg-light">
        <div className="container-fluid">
          <h2>
            <Link className="nav-link text-primary" to={`/web`}>
              T-SALE.COM
            </Link>
          </h2>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <i className="fa-solid fa-bars fa-xl"></i>
            </span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarToggleExternalContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {allCategory.listAll
                .filter((category) => category.ParentsId == 0)
                .map((category) => (
                  <li className="nav-item" key={category.Id}>
                    <Link
                      className="nav-link"
                      to={`/web/category?categoryId=${category.Id}`}
                    >
                      {category.Name}
                    </Link>
                  </li>
                ))}
            </ul>
            <div className="d-flex align-items-center">
              <Link className="text-decoration-none" to={`/web/login`}>
                <button className="btn btn-outline-primary">Login</button>
              </Link>
              <div className="d-flex input-group mx-3 w-auto">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                />
                <span
                  className="input-group-text bg-primary border-0"
                  id="search-addon"
                >
                  <i className="fas fa-search text-light"></i>
                </span>
              </div>
              <Badge className="mx-3" count={0} showZero>
                <Avatar
                  size="large"
                  className="bg-light text-primary"
                  icon={<i className="fa-solid fa-cart-shopping"></i>}
                />
              </Badge>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
