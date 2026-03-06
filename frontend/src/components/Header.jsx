import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) return <Loader />;

  if (error) return <h1 className="text-center text-red-500">Error loading products</h1>;

  return (
    <div className="flex justify-around mt-[52px] items-start gap-6">
      
      {/* Left side small products */}
      <div className="hidden xl:block lg:hidden md:hidden sm:hidden">
        <div className="grid grid-cols-2 gap-4">
          {data?.map((product) => (
            <SmallProduct key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* Right side carousel */}
      <div className="flex-1 mt-[-18px]">
        <ProductCarousel />
      </div>

    </div>
  );
};

export default Header;
