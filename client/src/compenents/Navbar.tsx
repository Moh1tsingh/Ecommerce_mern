import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className=" w-screen h-[9vh] flex justify-between font-medium p-4 px-6 text-lg bg-white rounded-lg">
      <div>
        <Link to="/">
          <h1 className=" text-xl font-bold text-blue-700">Ecommerce Shop</h1>
        </Link>
      </div>
      <div className="flex gap-9">
        <Link to="/">Shop</Link>
        <Link to="/purchased-items">Purchases</Link>
        <Link to="/checkout" className=" flex item-center gap-1">
          <span className=" text-2xl pt-[2px]">
            <FaShoppingCart />
          </span>
          Cart
        </Link>
        {/* <Link to="/auth" className=" flex item-center gap-1">
          <span className=" text-xl pt-1">
            <FaUser />
          </span>
          Login/SignUp
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;
