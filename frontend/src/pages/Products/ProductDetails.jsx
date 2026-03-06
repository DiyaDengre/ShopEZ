import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
  useGetTopProductsQuery,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import SmallProduct from "./SmallProduct";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { data: relatedProducts, isLoading: relatedLoading } =
    useGetTopProductsQuery();

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <div>
        <Link
          to="/"
          className="text-white font-semibold hover:underline ml-[10rem]"
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative items-start mt-[2rem] ml-[10rem]">
            <div className="relative bg-[#111] p-4 rounded-xl flex justify-center items-center mr-[2rem]">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[500px] w-auto object-contain rounded-lg hover:brightness-75 hover:scale-105 transition duration-300"
              />
              <HeartIcon product={product} />
            </div>

            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold">{product.name}</h2>

              <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                {product.description}
              </p>

              <p className="text-5xl my-4 font-extrabold">₹ {product.price}</p>

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-8">
                <div className="space-y-4">
                  <h1 className="flex items-center">
                    <FaStore className="mr-2 text-white" />
                    Brand: {product.brand}
                  </h1>

                  <h1 className="flex items-center">
                    <FaClock className="mr-2 text-white" />
                    Added: {moment(product.createdAt).fromNow()}
                  </h1>

                  <h1 className="flex items-center">
                    <FaStar className="mr-2 text-white" />
                    Reviews: {product.numReviews}
                  </h1>
                </div>

                <div className="space-y-4">
                  <h1 className="flex items-center">
                    <FaStar className="mr-2 text-white" />
                    Ratings: {product.rating}
                  </h1>

                  <h1 className="flex items-center w-[10rem]">
                    <FaBox className="mr-2 text-white" />
                    In Stock: {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between flex-wrap">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>

            {/* Related Products Section */}
            <div className="mt-[5rem] ml-[10rem]">
              <h2 className="text-3xl font-bold mb-8">Related Products</h2>
              <div className="flex flex-wrap gap-4">
                {relatedLoading ? (
                  <Loader />
                ) : relatedProducts && relatedProducts.length > 0 ? (
                  relatedProducts
                    .filter((relatedProduct) => relatedProduct._id !== productId)
                    .map((relatedProduct) => (
                      <div key={relatedProduct._id}>
                        <SmallProduct product={relatedProduct} />
                      </div>
                    ))
                ) : (
                  <p>No related products available</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;