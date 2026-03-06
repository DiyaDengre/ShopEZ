import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./pages/Admin/AdminRoute";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// User
import Profile from "./pages/User/Profile";

// Products
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";

// Shop
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";

// Orders
import Shipping from "./pages/Orders/Shipping.jsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";
import Order from "./pages/Orders/Order.jsx";
import MyOrders from "./pages/Orders/MyOrders.jsx";

// Admin
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import UserList from "./pages/Admin/UserList";
import CategoryList from "./pages/Admin/CategoryList";
import ProductList from "./pages/Admin/ProductList";
import AllProducts from "./pages/Admin/AllProducts";
import ProductUpdate from "./pages/Admin/ProductUpdate";
import OrderList from "./pages/Admin/OrderList.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index element={<Home />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/user-orders" element={<MyOrders />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="productlist/:pageNumber" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path="orderlist" element={<OrderList />} />
      </Route>

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);