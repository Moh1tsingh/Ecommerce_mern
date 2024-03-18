import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./compenents/Navbar";
import ShopPage from "./pages/shop";
import AuthPage from "./pages/auth";
import CheckoutPage from "./pages/checkout";
import PurchasedItemsPage from "./pages/purchased-items";

const App = () => {
  return (
    <div className=" w-full min-h-screen bg-slate-100 text-black">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/purchased-items" element={<PurchasedItemsPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
