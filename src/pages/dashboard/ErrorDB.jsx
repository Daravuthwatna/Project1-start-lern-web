/* eslint-disable no-unused-vars */
import React from "react";

const ErrorDB = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Oops!</span> Page not found.
        </p>
        <p className="lead">The page you’re looking for doesn’t exist.</p>
        <a href="/dashboard" className="btn btn-primary">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default ErrorDB;
