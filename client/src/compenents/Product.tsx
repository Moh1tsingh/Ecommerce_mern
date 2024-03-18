import { useContext } from "react";
import { IProduct } from "../models/interfaces";
import { IShopContext, ShopContext } from "../context/shop-context";

interface Props {
  product: IProduct;
}

const Product = (props: Props) => {
  const { _id, productName, description, price, stockQuantity, imageURL } =
    props.product;

  const { addToCart, getCartItemsCount } =
    useContext<IShopContext>(ShopContext);
  const count = getCartItemsCount(_id);
  return (
    <div className=" w-[25vw] h-full bg-white rounded-xl flex flex-col items-center p-4">
      <img
        className="w-60 h-70 p-10 object-contain"
        src={imageURL}
        alt={productName}
      />
      <div className="w-full">
        <div className="w-full flex justify-between px-2 font-semibold text-2xl ">
          <h1>{productName}</h1>
          <h1>{price}$</h1>
        </div>
        <div className="w-full h-12 flex justify-between px-2 overflow-hidden ">
          <h1 className=" opacity-65 max-w-40">{description}</h1>
          <h1 className=" opacity-55">{stockQuantity} left</h1>
        </div>
      </div>
      {stockQuantity === 0 && (
        <h1 className=" text-red-600 text-2xl font-semibold pt-4">
          OUT OF STOCK!
        </h1>
      )}
      {stockQuantity !== 0 && (
        <button
          onClick={() => addToCart(_id)}
          className="w-full mt-2 py-3 px-6  text-lg text-black hover:bg-neutral-900 hover:text-white font-semibold rounded-xl outline transition-all duration-200"
        >
          Add to cart <span>({count})</span>
        </button>
      )}
    </div>
  );
};

export default Product;
