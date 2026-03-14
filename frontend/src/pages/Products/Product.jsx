import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[320px] bg-[#111] ml-7 mr-7 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[260px] object-cover hover:brightness-75 hover:scale-105 transition duration-300"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://placehold.co/320x260?text=No+Image";
          }}
        />
        <HeartIcon product={product} className="bg-pink-600" />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center text-white">
            <span className="text-md font-medium">{product.name}</span>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
              ₹ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
