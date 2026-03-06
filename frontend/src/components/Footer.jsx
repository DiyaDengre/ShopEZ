import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111] ml-[70px] text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <a href="/"> <h3 className="text-2xl font-bold mb-4 text-pink-500">Shop Ez</h3></a>
           
            <p className="text-gray-300 mb-4 max-w-md">
              Your one-stop destination for quality products. We offer a wide range of items
              with fast shipping and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/favorite"
                  className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} MERN Store. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-300 hover:text-pink-500 text-sm transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-pink-500 text-sm transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;