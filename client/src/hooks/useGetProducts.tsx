import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { useGetTokens } from "./useGetToken";
import { IProduct } from "../models/interfaces";
import { IShopContext, ShopContext } from "../context/shop-context";

export const useGetProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { headers } = useGetTokens();
  // const { isAuthenticated } = useContext<IShopContext>(ShopContext);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await Axios.get("http://localhost:3001/product", {
        headers,
      });
      setProducts(fetchedProducts.data.products);
    } catch (error) {
      alert("Error - something went wrong");
    }
  };
  useEffect(() => {
    
      fetchProducts();
    
  }, []);
  return { products };
};
