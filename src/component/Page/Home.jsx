import React, { useState } from "react";
import firstImage from "../Images/first.jpg";
import { useQuery } from "@tanstack/react-query";

function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const apiCall = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    return data.filter((item) => item.rating.rate >= 3); // ✅ Returns filtered data
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: apiCall,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {/* Hero Section with Full-Screen Background */}
      <div
        className="relative w-full h-screen bg-cover bg-center flex flex-col justify-center items-center text-center text-white px-4"
        style={{ backgroundImage: `url(${firstImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Hero Content */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Our Website
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Your journey to excellence begins here.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition duration-300">
            Get Started
          </button>
        </div>
      </div>

      {/* Product Section - Starts AFTER the background image */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Featured Products
          </h2>

          {/* Product Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {data?.map((product) => (
              <div
                key={product.id}
                className="p-6 bg-white rounded-xl shadow-md text-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                onClick={() => setSelectedProduct(product)}
                style={{ minHeight: "420px" }}
              >
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-60 object-cover rounded-md transition-transform duration-300 hover:scale-105"
                />

                {/* Product Details */}
                <h3 className="text-xl font-semibold text-gray-800 mt-4">
                  {product.title}
                </h3>
                <p className="text-gray-600 mt-2">
                  <strong>Category:</strong> {product.category}
                </p>
                <p className="text-gray-600 mt-2">
                  <strong>Price:</strong> ₹{product.price.toFixed(2)}
                </p>
                <p className="text-yellow-500 mt-2">
  ⭐ {product.rating?.rate ? `${product.rating.rate} / 5` : "No Rating"}
</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed top-0 inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 overflow-y-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setSelectedProduct(null)}
            >
              ✖
            </button>

            {/* Modal Content */}
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="w-full h-80 object-cover rounded-md"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mt-4">
              {selectedProduct.title}
            </h3>
            <p className="text-gray-600 mt-2">
              <strong>Category:</strong> {selectedProduct.category}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Price:</strong> ₹{selectedProduct.price.toFixed(2)}
            </p>
            <p className="text-gray-700 mt-4">{selectedProduct.description}</p>
            <p className="text-yellow-500 mt-2">
              ⭐ {selectedProduct.rating.rate} / 5
            </p>

            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
