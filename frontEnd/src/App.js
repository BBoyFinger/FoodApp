import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetScroll from "./components/ResetScroll/ResetScroll";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import DetailPage from "./pages/DetailPage";
import Slide from "./components/Admin/components/Slidebar/Slide";
import Dashboard from "./components/Admin/components/Dashboard/Dashboard";
import AppChatAdmin from "./components/Admin/components/AppChat/AppChat";
import { useSelector } from "react-redux";
import AdminUser from "./components/Admin/components/AdminUser/AdminUser";
import AdminProduct from "./components/Admin/components/AdminProduct/AdminProduct";
import CreateProduct from "./components/Admin/components/AdminProduct/CreateProduct";
import AdminUpdateProduct from "./components/Admin/components/AdminProduct/AdminUpdateProduct.js";
import DataFilterProduct from "./components/Admin/components/AdminProduct/DataFilterProduct/DataFilterProduct";
import OrderPage from "./pages/OrderPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrderAdminPage from "./pages/OrderAdminPage";
import InventoryAdminPage from "./pages/InventoryAdmin.js";
import AllOrder from "./components/MyOrder/AllOrder/AllOrder";
import PaidOrder from "./components/MyOrder/PaidOrder/PaidOrder";
import ShippingOrder from "./components/MyOrder/ShippingOrder/ShippingOrder";
import PenddingOrder from "./components/MyOrder/PendingOrder/PenddingOrder";
import ReviewProduct from "./components/Admin/components/ReviewProduct/ReviewProduct";
import SearchPage from "./pages/SearchPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminUpdateUser from "./components/Admin/components/AdminUser/AdminUpdateUser";
import Profile from "./components/Profile/profile";
function App() {
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <BrowserRouter>
      <ResetScroll />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/product" element={<ProductsPage />} />
        <Route exact path="/cart" element={<CartPage />} />
        <Route exact path="/detail/:id" element={<DetailPage />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/order" element={<OrderPage />} />
        <Route exact path="/orderSuccess" element={<OrderSuccessPage />} />
        <Route exact path="/search" element={<SearchPage />} />
        <Route
          path="/admin/"
          element={
            <Slide>
              <Dashboard />
            </Slide>
          }
        />
        <Route
          path="/admin/chat"
          element={
            <Slide>
              <AppChatAdmin />
            </Slide>
          }
        />
        <Route
          path="/admin/user"
          element={
            <Slide>
              <AdminUser />
            </Slide>
          }
        />
        <Route
          path="/admin/user/update/:id"
          element={
            <Slide>
              <AdminUpdateUser />
            </Slide>
          }
        />
        <Route
          path="/admin/product"
          element={
            <Slide>
              <AdminProduct />
            </Slide>
          }
        />
        <Route
          path="/admin/product/create"
          element={
            <Slide>
              <CreateProduct />
            </Slide>
          }
        />
        <Route
          path="/admin/product/update/:id"
          element={
            <Slide>
              <AdminUpdateProduct />
            </Slide>
          }
        />
        <Route
          path="/admin/product/update/info"
          element={
            <Slide>
              <DataFilterProduct />
            </Slide>
          }
        />
        <Route
          path="/admin/product/reviewProduct/:id"
          element={
            <Slide>
              <ReviewProduct />
            </Slide>
          }
        />

        <Route path="/admin/order" element={<OrderAdminPage />} />
        <Route path="/admin/inventory" element={<InventoryAdminPage />} />
        <Route path="/myOrder" element={<AllOrder />} />
        <Route path="/myOrder/pendding" element={<PenddingOrder />} />
        <Route path="/myOrder/shipping" element={<ShippingOrder />} />
        <Route path="/myOrder/paid" element={<PaidOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
