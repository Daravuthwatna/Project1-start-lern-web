/* eslint-disable no-unused-vars */
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product";
import Category from "./pages/Category";

import LayoutDB from "./dashboard/LayoutDB.jsx";
import Dashboard from "./dashboard/Pages/Dashboard.jsx";
import Employee from "./dashboard/Pages/Employee.jsx";
import Customer from "./dashboard/Pages/Customer.jsx";
import Products from "./dashboard/Pages/Product.jsx";
import LoginDB from "./dashboard/Pages/LoginDB.jsx";

import Error from "./pages/Error";
import ErrorDB from "./dashboard/Pages/ErrorDB.jsx";

const router = createBrowserRouter([
  {
    path: "/web",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/web/product/:id",
        element: <Product />,
      },
      {
        path: "/web/category",
        element: <Category />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <LayoutDB />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard/employee",
        element: <Employee />,
      },
      {
        path: "/dashboard/customer",
        element: <Customer />,
      },
      {
        path: "/dashboard/product",
        element: <Products />,
      },
      {
        path: "/dashboard/*",
        element: <ErrorDB />,
      },
    ],
  },
  {
    path: "/dashboard/login",
    element: <LoginDB />,
  },
  {
    path: "/web/*",
    element: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
