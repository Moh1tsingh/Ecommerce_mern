import { useContext } from "react";
import Product from "../../compenents/Product";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { Navigate } from "react-router-dom";

const ShopPage = () => {
  const { products } = useGetProducts();
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  return (
    <div className=" grid grid-cols-3 items-center m-5">
      {products.map((product, index) => (
        <Product product={product} key={index} />
      ))}
    </div>
  );
};

export default ShopPage;
