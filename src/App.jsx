/* eslint-disable no-unused-vars */
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/LayoutWeb.jsx";
import Home from "./pages/web/home/Home.jsx";
import Product from "./pages/web/Product.jsx";
import Category from "./pages/web/Category.jsx";

import LayoutDB from "./layout/LayoutDB.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Employee from "./pages/dashboard/employee/Employee.jsx";
import Categorys from "./pages/dashboard/category/Category.jsx";
import Products from "./pages/dashboard/prodduct/Product.jsx";
import LoginDB from "./pages/dashboard/login/LoginDB.jsx";

import Error from "./pages/web/Error.jsx";
import ErrorDB from "./pages/dashboard/ErrorDB.jsx";

import "./services/AxiosIntercepter";

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
        path: "/dashboard/category",
        element: <Categorys />,
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
