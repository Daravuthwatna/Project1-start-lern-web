/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import notFound from "../assets/no-product.png"

const DisCategory = () => {
  const { allCategory, allProduct } = useContext(ProductContext);
  const [category, setCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleCategoryClick = (catId) => {
    setCategory(catId);
    const products = allProduct.list.filter(
      (product) => product.CategoryId === catId
    );
    setFilteredProducts(products);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-2">
          <ul className="list-group">
            {allCategory.list &&
              allCategory.list
                .filter((cat) => cat.ParentsName !== "None")
                .map((cat) => (
                  <li
                    className={`list-group-item text-center mb-3 ${cat.Id === category ? "active" : ""}`}
                    key={cat.Id}
                    onClick={() => handleCategoryClick(cat.Id)}
                    style={{ cursor: "pointer" }}
                  >
                    {cat.Name}
                  </li>
                ))}
          </ul>
        </div>
        <div className="col-12 col-lg-10">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="col" key={product.Id}>
                  <div className="card h-100">
                    <img
                      src={`https://piseth.site/api/get-image/${product.images[0]}`}
                      className="card-img-top img-fluid"
                      alt={product.Name}
                      style={{
                        width: "100%",
                        height: "11rem",
                        objectFit: "contain",
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center">
                        {product.Name}
                      </h5>
                      <Link to={`/product/${product.Id}`}>
                        <button className="btn btn-outline-primary w-100">
                          {product.DiscountAmount} $ OFF
                        </button>
                      </Link>
                      <div className="row mt-2">
                        <div className="col-12 col-lg-6 text-center text-danger">
                          {product.NetPrice} $
                        </div>
                        <div className="col-12 col-lg-6 text-center text-dark text-decoration-line-through">
                          {product.Price} $
                        </div>
                      </div>
                      <p className="text-center mt-3">
                        {product.Description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <img
              src={notFound}
              className="card-img-top img-fluid"
              style={{
                width: "100%",
                height: "23rem",
                objectFit: "contain",
              }}
            />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisCategory;
