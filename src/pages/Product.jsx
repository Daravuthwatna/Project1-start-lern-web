/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { useParams } from "react-router-dom";
import { Image } from "antd";
import { Rate } from "antd";
import ScrollUp from "../components/ScrollUp";
import { Skeleton } from "antd";

const DisProduct = () => {
  const { id } = useParams();
  const { allProduct } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (allProduct && Array.isArray(allProduct.list)) {
      const fetchProduct = allProduct.list.find((p) => p.Id === parseInt(id));
      setProduct(fetchProduct || null);
      if (fetchProduct && fetchProduct.images.length > 0) {
        setImage(fetchProduct.images[0]);
      }
    }
  }, [allProduct, id]);

  if (!product) {
    return (
      <div className="container mt-4">
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <ScrollUp />
      <div className="row">
        <div className="col-12 col-lg-6 d-flex flex-column align-items-center">
          <div className="w-100 d-flex flex-wrap justify-content-center">
            <Image
              src={`https://piseth.site/api/get-image/${image}`}
              alt={product.Name}
              className="img-fluid"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "300px",
              }}
            />
          </div>
          <div className="d-flex flex-wrap justify-content-center mb-3">
            {product.images &&
              product.images.map((imageName) => (
                <img
                  key={imageName}
                  src={`https://piseth.site/api/get-image/${imageName}`}
                  alt={product.Name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                    cursor: "pointer",
                    margin: "5px",
                  }}
                  onClick={() => setImage(imageName)}
                  className="img-thumbnail"
                />
              ))}
          </div>
        </div>
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center">
          <h4>Name: {product.Name}</h4>
          <p className="mt-4 fw-bold">
            Old Price:{" "}
            <span>
              <button className="btn btn-outline-danger text-decoration-line-through">{`${product.Price} $`}</button>
            </span>
          </p>
          <p className="mt-4 fw-bold">
            Discount Price:{" "}
            <span className="text-success">
              <button className="btn btn-outline-success">{`${product.DiscountAmount} $ OFF`}</button>
            </span>
          </p>
          <p className="mt-4 fw-bold">
            New Price:{" "}
            <span className="text-primary">
              <button className="btn btn-outline-primary">{`${product.NetPrice} $`}</button>
            </span>
          </p>
          <p className="mt-4 fw-bold">Quantity: {product.Qty}</p>
          <p className="mt-4 fw-bold">Description: {product.Description}</p>
          <p className="mt-4 fw-bold">
            Rate: <Rate allowHalf defaultValue={5} />
          </p>
          <div className="container mt-4 fw-bold">
            <div className="row">
              <div className="col-12 col-lg-6">
                <button className="btn w-100 btn-danger">Add Cart</button>
              </div>
              <div className="col-12 col-lg-6">
                <button className="btn w-100 btn-outline-primary">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisProduct;
