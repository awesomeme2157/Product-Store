import { useState } from "react";
import { useProductStore } from "../store/product";
import toast, { Toaster } from "react-hot-toast";

const InputField = ({ type, placeholder, name, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition"
  />
);

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error("All fields are required", { duration: 3000 });
      return;
    }

    if (isNaN(newProduct.price) || newProduct.price <= 0) {
      toast.error("Please enter a valid price", { duration: 3000 });
      return;
    }

    setLoading(true);
    const { success, message } = await createProduct(newProduct);
    setLoading(false);

    if (success) {
      toast.success(`Success: ${message}`, { duration: 3000 });
      setNewProduct({ name: "", price: "", image: "" });
    } else {
      toast.error(`Error: ${message}`, { duration: 3000 });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-center mb-8">
        Create New Product
      </h1>
      <div className="w-full bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <InputField
            type="text"
            placeholder="Product Name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <InputField
            type="number"
            placeholder="Price"
            name="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <InputField
            type="text"
            placeholder="Image URL"
            name="image"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
          <button
            onClick={handleAddProduct}
            disabled={loading}
            className={`w-full p-3 rounded-lg font-medium text-white transition duration-200 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
