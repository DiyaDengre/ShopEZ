import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const imageUrl = `https://shopez-backend-fzaa.onrender.com${p.image}`;

  return (
    <div className="max-w-sm relative bg-[#1A1A1A] rounded-lg shadow">
      <section className="relative">
        <Link to={`/product/${p.id}`}>
          <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {p.brand}
          </span>

          <img
            className="cursor-pointer w-full hover:brightness-75 hover:scale-105 transition duration-300"
            src={imageUrl}
            alt={p.name}
            style={{ height: "170px", objectFit: "cover" }}
          />
        </Link>

        <HeartIcon product={p} />
      </section>

      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl text-white">{p.name}</h5>

          <p className="font-semibold text-pink-500">
            ₹ {p.price}
          </p>
        </div>

        <p className="mb-3 font-normal text-[#CFCFCF]">
          {p.description.substring(0, 60)}...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${p.id}`}
            className="px-3 py-2 text-sm text-white bg-pink-700 rounded-lg hover:bg-pink-800"
          >
            Read More
          </Link>

          <button
            className="p-2 rounded-full"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
