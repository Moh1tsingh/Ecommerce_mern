import { createContext, useEffect, useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import { IProduct } from "../models/interfaces";
import Axios from "axios";
import { useGetTokens } from "../hooks/useGetToken";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export interface IShopContext {
  addToCart: (ItemId: string) => void;
  removeFromCart: (ItemId: string) => void;
  updateCartItemCount: (newAmount: number, ItemId: string) => void;
  getCartItemsCount: (ItemId: string) => number;
  getTotalCartAmount: () => number;
  checkOut: () => void;
  availableMoney: number;
  purchasedItems: IProduct[];
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const defaultVal: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItemCount: () => null,
  getCartItemsCount: () => 0,
  getTotalCartAmount: () => null,
  checkOut: () => null,
  availableMoney: 0,
  purchasedItems: [],
  isAuthenticated: false,
  setIsAuthenticated: () => null,
};
export const ShopContext = createContext<IShopContext>(defaultVal);

export const ShopContextProvider = (props) => {
  const [cookies, _] = useCookies(["access_token"]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    cookies.access_token !== null
  );
  const [purchasedItems, setPurchasedItems] = useState<IProduct[]>([]);
  const [availableMoney, setAvailableMoney] = useState();
  const [cartItems, setCartItems] = useState<{ string: number } | {}>({});
  const { products } = useGetProducts();
  const { headers } = useGetTokens();
  const navigate = useNavigate();
  const fetchAvailableMoney = async () => {
    try {
      const userID = localStorage.getItem("userID");
      const result = await Axios.get(
        `http://localhost:3001/user/available-money/${userID}`,
        { headers }
      );
      setAvailableMoney(result.data.availableMoney);
    } catch (error) {
      alert("Something went wrong");
    }
  };
  const fetchPurchasesItems = async () => {
    try {
      const userID = localStorage.getItem("userID");
      const result = await Axios.get(
        `http://localhost:3001/product/purchased-items/${userID}`,
        { headers }
      );
      setPurchasedItems(result.data.purchasedItems);
    } catch (error) {
      alert("Something went wrong");
    }
  };
  const getCartItemsCount = (itemId: string): number => {
    if (itemId in cartItems) {
      return cartItems[itemId];
    }
    return 0;
  };
  const addToCart = (itemId: string) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };
  const checkOut = async () => {
    const body = { customerID: localStorage.getItem("userID"), cartItems };

    try {
      await Axios.post("http://localhost:3001/product/checkout", body, {
        headers,
      });
      setCartItems({});
      fetchAvailableMoney();
      fetchPurchasesItems();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalCartAmount = (): number => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo: IProduct = products.find(
          (product) => product._id === item
        );
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price;
        } else {
          console.error(`Product with ID ${item} not found`);
        }
      }
    }
    return totalAmount;
  };

  const removeFromCart = (itemId: string) => {
    if (!cartItems[itemId]) return;
    if (cartItems[itemId] === 0) return;
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  const updateCartItemCount = (newAmount: number, itemId: string) => {
    if (newAmount < 0) return;
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAvailableMoney();
      fetchPurchasesItems();
    }
  }, [isAuthenticated, fetchAvailableMoney, fetchPurchasesItems]);

  const contextValue: IShopContext = {
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getCartItemsCount,
    getTotalCartAmount,
    checkOut,
    availableMoney,
    purchasedItems,
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
