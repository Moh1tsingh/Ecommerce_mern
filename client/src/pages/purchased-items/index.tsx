import { useContext } from "react";
import { IShopContext, ShopContext } from "../../context/shop-context";

const PurchasedItemsPage = () => {
  const { purchasedItems } = useContext<IShopContext>(ShopContext);
  return (
    <div>
      <div className=" flex gap-4 m-5">
        {purchasedItems.map((product: any, index) => {
          const { imageURL, productName, price } = product;
          return (
            <div className="" key={index}>
              <div className=" bg-white rounded-xl flex flex-col items-center p-4">
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PurchasedItemsPage;
