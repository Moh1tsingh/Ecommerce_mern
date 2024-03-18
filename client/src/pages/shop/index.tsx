import Product from "../../compenents/Product";
import { useGetProducts } from "../../hooks/useGetProducts";

const ShopPage = () => {
  const { products } = useGetProducts();
  return (
    <div className=" grid grid-cols-3 items-center m-5">
      {products.map((product) => (
        <Product product={product} />
      ))}
    </div>
  );
};

export default ShopPage;
