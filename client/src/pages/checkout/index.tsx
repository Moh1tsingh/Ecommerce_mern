import { useContext } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { products } = useGetProducts();
  const {
    getCartItemsCount,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkOut,
  } = useContext<IShopContext>(ShopContext);
  const navigate = useNavigate();
  const totalCartAmount = getTotalCartAmount();

  return (
    <div className="w-screen  flex justify-center items-center  flex-col">
      <div className=" pt-7 text-2xl font-bold opacity-60">
        <h1>Your Cart Items</h1>
      </div>
      <div className=" w-full flex justify-center pt-5 ">
        <div className=" w-3/5  flex gap-4 flex-col py-4">
          {products.map((product: IProduct, index) => {
            if (getCartItemsCount(product._id) !== 0) {
              const cartItemCount = getCartItemsCount(product._id);
              return (
                <div
                  key={index}
                  className=" w-full flex justify-between items-center bg-white rounded-xl p-3 shadow-lg"
                >
                  <div className=" w-full h-40 object-cover pl-8 flex">
                    <img src={product.imageURL} alt="" />
                    <div className=" opacity-90 ml-8 flex flex-col  justify-center items-start">
                      <h1 className="text-2xl font-semibold ">
                        {product.productName}
                      </h1>
                      <h1 className=" text-xl">{product.description}</h1>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center  mr-7">
                    <h1 className=" text-2xl font-bold opacity-90">
                      {product.price}$
                    </h1>
                    <div className="flex gap-2 -mr-16">
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className=" bg-neutral-900 text-white px-4 py-1 rounded-xl font-bold"
                      >
                        -
                      </button>
                      <input
                        className=" w-1/4 outline rounded-lg text-center outline-2"
                        type="number"
                        value={cartItemCount}
                        onChange={(e) =>
                          updateCartItemCount(
                            Number(e.target.value),
                            product._id
                          )
                        }
                      />
                      <button
                        onClick={() => addToCart(product._id)}
                        className=" bg-neutral-900 text-white px-4 py-1 rounded-xl font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      {totalCartAmount > 0 ? (
        <div className=" flex flex-col justify-center items-center">
          <div>
            <h1 className=" text-xl font-bold ">
              Subtotal : {totalCartAmount.toFixed(2)}$
            </h1>
          </div>
          <div className=" flex gap-3">
            <button
              onClick={() => {
                navigate("/");
              }}
              className=" bg-neutral-900 text-white px-7 py-3 rounded-xl font-bold"
            >
              Continue Shopping
            </button>
            <button
              onClick={checkOut}
              className=" bg-neutral-900 text-white px-7 py-3 rounded-xl font-bold"
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <h1 className=" text-2xl font-bold">Your Cart is empty!</h1>
      )}
    </div>
  );
};

export default CheckoutPage;
