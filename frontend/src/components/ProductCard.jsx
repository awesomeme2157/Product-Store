import { useProductStore } from "../store/product";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const { deleteProduct, updateProduct } = useProductStore();

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) {
      toast.success(`Success: ${message}`, { duration: 3000 });
    } else {
      toast.error(`Error: ${message}`, { duration: 3000 });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    setIsOpen(false);
    if (success) {
      toast.success(`Success: ${message}`, { duration: 3000 });
    } else {
      toast.error(`Error: ${message}`, { duration: 3000 });
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 bg-white dark:bg-gray-800">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-48 w-full object-cover"
          />
        ) : (
          <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-xl font-bold text-gray-600 dark:text-gray-200 mb-4">
            ${product.price}
          </p>

          <div className="flex space-x-2">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            >
              <CiEdit />
            </button>
            <button
              onClick={() => handleDeleteProduct(product._id)}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
            >
              <MdDeleteOutline />
            </button>
          </div>
        </div>

        {/* Update Modal */}
        {isOpen && (
          <UpdateModal
            product={updatedProduct}
            setProduct={setUpdatedProduct}
            onUpdate={() => handleUpdateProduct(product._id, updatedProduct)}
            onClose={() => setIsOpen(false)}
            inputRef={inputRef}
          />
        )}

        {/* Link to create a new product if none exists */}
        {!product && (
          <p className="text-xl text-center font-bold text-gray-500 mt-4">
            No products found 😢{" "}
            <Link to="/create" className="text-blue-500 hover:underline">
              Create a product
            </Link>
          </p>
        )}
      </div>
    </>
  );
};

const UpdateModal = ({ product, setProduct, onUpdate, onClose, inputRef }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-md w-full relative">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Update Product
      </h2>

      <div className="space-y-4">
        <input
          ref={inputRef}
          type="text"
          placeholder="Product Name"
          value={product.name}
          onChange={(e) =>
            setProduct({
              ...product,
              name: e.target.value,
            })
          }
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition"
        />
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) =>
            setProduct({
              ...product,
              price: e.target.value,
            })
          }
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={product.image}
          onChange={(e) =>
            setProduct({
              ...product,
              image: e.target.value,
            })
          }
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition"
        />
      </div>

      <div className="flex justify-end mt-6 space-x-3">
        <button
          onClick={onUpdate}
          className="bg-blue-600 text-white py-2 px-5 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Update
        </button>
        <button
          onClick={onClose}
          className="bg-gray-200 dark:bg-gray-600 py-2 px-5 rounded-lg font-medium text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;
