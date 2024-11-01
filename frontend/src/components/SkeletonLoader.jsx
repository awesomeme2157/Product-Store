// components/SkeletonLoader.jsx

const SkeletonLoader = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex flex-col items-center space-y-8">
        {/* Page Title Skeleton */}
        <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>

        {/* Grid Skeleton for ProductCard Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 bg-white dark:bg-gray-800 animate-pulse"
            >
              {/* Image Placeholder */}
              <div className="h-48 w-full bg-gray-200 dark:bg-gray-700"></div>

              {/* Product Details Placeholder */}
              <div className="p-4 space-y-2">
                {/* Product Name */}
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                {/* Price */}
                <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>

                {/* Action Buttons Placeholder */}
                <div className="flex space-x-2 mt-4">
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
