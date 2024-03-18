import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shop-context";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const { availableMoney, isAuthenticated, setIsAuthenticated } =
    useContext<IShopContext>(ShopContext);
  const [_, setCookie] = useCookies(["access_token"]);
  const logout = () => {
    localStorage.clear();
    setCookie("access_token", null);
    setIsAuthenticated(false);
  };
  return (
    <div className=" w-screen h-[9vh] flex justify-between font-medium p-4 px-6 text-lg bg-white rounded-lg ">
      <div>
        <Link to="/">
          <h1 className=" text-xl font-bold text-blue-700">Ecommerce Shop</h1>
        </Link>
      </div>
      {isAuthenticated && (
        <>
          <div className="flex gap-9">
            <Link to="/">Shop</Link>
            <Link to="/purchased-items">Purchases</Link>
            <Link to="/checkout" className=" flex item-center gap-1">
              <span className=" text-2xl pt-[2px]">
                <FaShoppingCart />
              </span>
              Cart
            </Link>

            <Link
              onClick={logout}
              to="/auth"
              className=" flex item-center gap-1"
            >
              <span className=" text-xl pt-1">
                <FaUser />
              </span>
              Log out
            </Link>

            <h1>{availableMoney}$</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
