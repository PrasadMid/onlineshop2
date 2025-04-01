import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Product() {
  const navigate = useNavigate();

  const apiCall = async () => {
    try {
      const [response1, response2] = await Promise.all([
        fetch("https://api.pujakaitem.com/api/products"),
        fetch("https://fakestoreapi.com/products"),
      ]);
  
      if (!response1.ok || !response2.ok) {
        throw new Error("One or both API responses were not ok");
      }
  
      const [data1, data2] = await Promise.all([response1.json(), response2.json()]);
  
      // ✅ Merge both datasets
      const mergedData = [...data1, ...data2];
  
      console.log("Merged Data:", mergedData);
      return mergedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return []; // Return empty array on failure
    }
  };
  
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: apiCall,
  });

  const handleProductClick = (product) => {
    // Store the selected product in sessionStorage so it's available on the next page
    sessionStorage.setItem('selectedProduct', JSON.stringify(product));
    // Navigate to the product detail page
    navigate(`/product/${product.id}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen pt-20 pb-24">
      <div className="container mx-auto px-4 space-y-16">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">Our Product</h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          We offer high-quality Products to meet your needs. Explore our offerings below.
        </p>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {data?.map((product) => (
            <div
              key={product.id}
              className="relative p-6 bg-white rounded-xl shadow-md text-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              onClick={() => handleProductClick(product)}
              style={{ minHeight: "420px" }}
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name || product.title}
                  className="w-full h-60 object-cover mt-4 rounded-md transition-transform duration-300 hover:scale-105"
                />
              )}
              <h3 className="text-xl font-semibold text-gray-800 mt-4">{product.name || product.title}</h3>
              <p className="text-gray-600 mt-2"><strong>Company:</strong> {product.company || 'N/A'}</p>
              <p className="text-gray-600 mt-2"><strong>Price:</strong> ₹{(product.price / 100).toLocaleString()}</p>
              <p className="text-gray-600 mt-2">
 
              {product.colors && product.colors.length > 0 && (
                <p className="text-gray-600 mt-2">
                  <strong>Available Colors:</strong>
                  {product.colors.map((color, index) => (
                    <span
                      key={index}
                      className="inline-block w-5 h-5 ml-1 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                </p>
              )}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <NavLink to={'/contact'}>
        <div className="mt-12 bg-blue-600 text-white py-10 text-center rounded-xl">
          <h2 className="text-2xl font-semibold">Ready to get started?</h2>
          <p className="mt-2">Contact us today </p>
          <button className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-gray-200">
            <Link to="/contact">Get in Touch</Link>
          </button>
        </div>
        </NavLink>
      </div>
      
      {/* Footer */}

    </div>
  );
}

export default Product;