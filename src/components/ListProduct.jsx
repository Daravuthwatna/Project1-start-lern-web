/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

const ListProduct = () => {
  const { allProduct } = useContext(ProductContext);
  const handleTop =()=>{
    window.scrollTo({top: 0, left: 0});
  }

  return (
    <div className="container-fluid">
      <h1 className="mt-5 text-primary">Product</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mt-1">
        {allProduct.list &&
          allProduct.list.map((product) => (
            <div className="col" key={product.Id}>
              <div className="card h-100">
                <Link to={`/product/${product.Id}`} onClick={handleTop}>
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
                </Link>
                <div className="card-body w-100">
                  <h5 className="card-title text-center">{product.Name}</h5>
                  <Link to={`/product/${product.Id}`}>
                    <button className="btn btn-outline-primary w-100 card-text">
                      {product.DiscountAmount} $ OFF
                    </button>
                  </Link>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12 col-lg-6 text-center mt-2 text-danger">
                        {product.NetPrice} ${" "}
                      </div>
                      <div className="col-12 col-lg-6 text-center mt-2 text-dark text-decoration-line-through">
                        {product.Price} ${" "}
                      </div>
                    </div>
                  </div>
                  <p className="text-center mt-3">{product.Description}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListProduct;
