import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem]  lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[30rem] hover:brightness-75 hover:scale-105 transition duration-300"
                />

                <div className="mt-4 flex flex-col lg:flex-row justify-between gap-8">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <p className="text-xl text-pink-500 mt-2">₹ {price}</p>
                    <p className="mt-3 text-sm leading-relaxed">
                      {description.substring(0, 170)}...
                    </p>
                  </div>

                  <div className="flex-1 flex flex-col lg:flex-row justify-between gap-6 mt-6 lg:mt-0">
                    <div className="space-y-4">
                      <h1 className="flex items-center">
                        <FaStore className="mr-2 text-white" /> Brand: {brand}
                      </h1>
                      <h1 className="flex items-center">
                        <FaClock className="mr-2 text-white" /> Added: {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center">
                        <FaStar className="mr-2 text-white" /> Reviews: {numReviews}
                      </h1>
                    </div>

                    <div className="space-y-4">
                      <h1 className="flex items-center">
                        <FaStar className="mr-2 text-white" /> Ratings: {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center">
                        <FaShoppingCart className="mr-2 text-white" /> Quantity: {quantity}
                      </h1>
                      <h1 className="flex items-center">
                        <FaBox className="mr-2 text-white" /> In Stock: {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
