/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import baseService from "../services/baseService";

export const ProductContext = createContext(null);

const ProductContextProvider = ({ children }) => {
  const [allCategory, setAllCategory] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const fetchCategory = async () => {
      const response = await baseService.get('https://piseth.site/api/web/category/get-list');
      setAllCategory(response);
  };
  const fetchProduct = async () => {
    const response = await baseService.get('https://piseth.site/api/web/product/get-list?pageSize=10&page=1');
    setAllProduct(response);
  }
  useEffect(() => {
    fetchCategory();
    fetchProduct();
  }, []);

  return (
    <ProductContext.Provider value={{ allCategory, allProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
