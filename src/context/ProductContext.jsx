/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext(null);

const ProductContextProvider = ({ children }) => {
  const [allCategory, setAllCategory] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const fetchCategory = async () => {
      const response = await axios.get('https://piseth.site/api/web/category/get-list');
      setAllCategory(response.data);
  };
  const fetchProduct = async () => {
    const response = await axios.get('https://piseth.site/api/web/product/get-list?pageSize=10&page=1');
    setAllProduct(response.data);
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
