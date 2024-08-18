/* eslint-disable no-unused-vars */
import React from 'react'
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from './Layout';
import Home from './pages/Home';
import Product from './pages/Product';
import Category from './pages/Category';
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/category",
        element: <Category />,
      },
    ],
  },
  {
    path: "/*",
    element: <Error />,
  },
])

const App = () => {
  return <RouterProvider router={router}/>;
}

export default App