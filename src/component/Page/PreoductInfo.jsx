import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  
  // First try to get product from sessionStorage
  useEffect(() => {
    const storedProduct = sessionStorage.getItem('selectedProduct');
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
  }, []);
  
  // If not in sessionStorage, fetch from API
  const fetchProduct = async () => {
    if (product) return product; // Use existing product if available
    
    try {
      // Try from both APIs
      const [response1, response2] = await Promise.all([
        fetch(`https://api.pujakaitem.com/api/products/${id}`).catch(() => ({ ok: false })),
        fetch(`https://fakestoreapi.com/products/${id}`).catch(() => ({ ok: false }))
      ]);
      
      if (response1.ok) {
        const data = await response1.json();
        return data;
      }
      
      if (response2.ok) {
        const data = await response2.json();
        return data;
      }
      
      throw new Error("Product not found");
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  };
  
  const { data: fetchedProduct, error, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
    enabled: !product, // Only run query if we don't have the product already
  });
  
  // Use fetched product if available
  useEffect(() => {
    if (fetchedProduct && !product) {
      setProduct(fetchedProduct);
    }
  }, [fetchedProduct]);
  
  if (isLoading && !product) return <p className="text-center mt-20">Loading product details...</p>;
  if (error && !product) return <p className="text-center mt-20 text-red-500">Error: {error.message}</p>;
  if (!product) return <p className="text-center mt-20">Product not found</p>;

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen pt-20 pb-24">
      <div className="container mx-auto px-4">
        <Link to="/product" className="inline-block mb-6 text-blue-600 hover:text-blue-800">
          ← Back to Products
        </Link>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              {product.image && (
                <img 
                  src={product.image} 
                  alt={product.name || product.title} 
                  className="w-full h-96 object-cover object-center"
                />
              )}
            </div>
            <div className="p-8 md:w-1/2">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name || product.title}</h1>
              
              <div className="mb-6">
                <span className="text-2xl text-blue-600 font-bold">
                  ₹{(product.price / 100).toLocaleString()}
                </span>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Product Details</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-gray-600"><strong>Brand/Company:</strong> {product.company || product.brand || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600"><strong>Category:</strong> {product.category || 'N/A'}</p>
                  </div>
                  {product.stock !== undefined && (
                    <div>
                      <p className="text-gray-600"><strong>In Stock:</strong> {product.stock}</p>
                    </div>
                  )}
                  {product.stars !== undefined && (
                    <div>
                      <p className="text-gray-600"><strong>Rating:</strong> {product.stars} / 5</p>
                    </div>
                  )}
                </div>
              </div>
              
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Available Colors</h3>
                  <div className="flex space-x-2">
                    {product.colors.map((color, index) => (
                      <span
                        key={index}
                        className="inline-block w-8 h-8 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      ></span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex space-x-4 mt-8">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex-1">
                  Add to Cart
                </button>
                <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                  ♥ Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    
    </div>
  );
}

export default ProductDetail;