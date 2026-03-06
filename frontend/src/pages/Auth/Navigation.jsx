import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { useSelector } from "react-redux";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [showSidebar] = useState(false);

  return (
    <>
      {/* persistent title outside of collapsible nav */}
      <Link to="/">
        <div
          className="fixed top-4 left-[2rem] text-white font-bold text-3xl z-[100000] drop-shadow-[0_2px_7px_rgba(0,0,0,1)]"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          ShopEZ
        </div>
      </Link>

      <div
        style={{ zIndex: 9999 }}
        className={`${
          showSidebar ? "hidden" : "flex"
        } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
        id="navigation-container"
      >
        {/* TOP MENU */}
        <div className="flex flex-col mt-[28px] justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center hover:translate-x-2 transition"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>
        </Link>

        <Link
          to="/shop"
          className="flex items-center hover:translate-x-2 transition"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
        </Link>

        <Link to="/cart" className="flex relative">
          <div className="flex items-center hover:translate-x-2 transition">
            <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">CART</span>
          </div>

          <div className="absolute top-9">
            {cartItems.length > 0 && (
              <span className="px-1 text-sm text-white bg-pink-500 rounded-full">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </div>
        </Link>

        <Link to="/favorite" className="flex relative">
          <div className="flex items-center hover:translate-x-2 transition">
            <FaHeart className="mt-[3rem] mr-2" size={20} />
            <span className="hidden nav-item-name mt-[3rem]">FAVORITES</span>
            <FavoritesCount />
          </div>
        </Link>
      </div>

      {/* BOTTOM SECTION */}
      <div>
        {userInfo ? (
          <Link
            to="/profile"
            className="flex items-center mt-6 hover:translate-x-2 transition"
          >
            <FaUserCircle size={28} />
            <span className="hidden nav-item-name ml-2">PROFILE</span>
          </Link>
        ) : (
          <div>
            <Link
              to="/login"
              className="flex items-center mt-6 hover:translate-x-2 transition"
            >
              <AiOutlineLogin className="mr-2" size={26} />
              <span className="hidden nav-item-name">LOGIN</span>
            </Link>

            <Link
              to="/register"
              className="flex items-center mt-6 hover:translate-x-2 transition"
            >
              <AiOutlineUserAdd className="mr-2" size={26} />
              <span className="hidden nav-item-name">REGISTER</span>
            </Link>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Navigation;