/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

const Navbar = () => {
  const { allCategory } = useContext(ProductContext);
  if (!allCategory.listAll) {
    return null;
  }
  return (
    <nav className="navbar navbar-expand-lg mb-5 navbar-light bg-light">
      <div className="container-fluid">
        <h2>
          <Link className="nav-link text-primary" to="/">
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
                  <Link className="nav-link" to={`/category?categoryId=${category.Id}`}>
                    {category.Name}
                  </Link>
                </li>
              ))}
            <li className="nav-item">
              <button className="btn btn-outline-primary">
                <Link className="text-decoration-none" to={`/login`}>
                  Login
                </Link>
              </button>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <p className="mb-0 me-3">
              <i className="fa-solid fa-phone text-primary"></i>+315 12 986 239
              / <i className="fa-brands fa-telegram text-primary"></i> +911 10
              917 911
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
