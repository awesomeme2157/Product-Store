/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product.js";
import ProductCard from "../components/ProductCard";
import SkeletonLoader from "../components/SkeletonLoader.jsx";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        await fetchProducts();
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [fetchProducts]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-center">
          Current Products 🚀
        </h1>

        {loading ? (
          <p className="text-xl text-center text-gray-500">
            <SkeletonLoader />
          </p>
        ) : error ? (
          <p className="text-xl text-center font-bold text-red-500">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-xl text-center font-bold text-gray-500">
            No products found 😢,{" "}
            <Link to="/create">
              <span className="text-blue-500 hover:underline">
                Create a product
              </span>
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
