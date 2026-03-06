import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();

  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !brand || !category || !image || !stock) {
      toast.error("Please fill all fields and upload an image");
      return;
    }

    try {
      const productData = {
        name,
        image,
        description,
        price: Number(price),
        category,
        brand,
        countInStock: Number(stock),
      };

      const res = await createProduct(productData).unwrap();

      toast.success(`${res.name} created successfully`);

      navigate("/admin/allproductslist");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Product creation failed");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();

      toast.success("Image uploaded successfully");

      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Image upload failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminMenu />

      <div className="flex-1 flex justify-center items-start p-10">
        <div className="bg-[#111] p-8 rounded-xl shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-pink-500">
            Create New Product
          </h2>

          {imageUrl && (
            <div className="mb-6 text-center">
              <img
                src={imageUrl}
                alt="product"
                className="mx-auto h-[200px] rounded-lg object-cover border border-gray-700"
              />
            </div>
          )}

          <label className="block border border-dashed border-gray-600 p-8 text-center rounded-lg cursor-pointer mb-6 hover:border-pink-500 transition">
            Upload Product Image
            <input
              type="file"
              accept="image/*"
              onChange={uploadFileHandler}
              className="hidden"
            />
          </label>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Product Name"
                className="p-3 bg-[#1a1a1a] border border-gray-700 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="number"
                placeholder="Price"
                className="p-3 bg-[#1a1a1a] border border-gray-700 rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="text"
                placeholder="Brand"
                className="p-3 bg-[#1a1a1a] border border-gray-700 rounded"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />

              <input
                type="number"
                placeholder="Stock"
                className="p-3 bg-[#1a1a1a] border border-gray-700 rounded"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />

              <select
                className="p-3 bg-[#1a1a1a] border border-gray-700 rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>

                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              placeholder="Product Description"
              className="p-3 bg-[#1a1a1a] border border-gray-700 rounded w-full h-28"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 transition px-8 py-3 rounded-lg font-semibold"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;