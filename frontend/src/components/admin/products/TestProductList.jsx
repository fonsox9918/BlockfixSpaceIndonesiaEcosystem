import React, { useState, useEffect } from "react";
import { getAllProducts } from "@/services/productService";

const TestProductList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('TestProductList: Starting fetch...');
        const response = await getAllProducts();
        console.log('TestProductList: Response received:', response);
        setData(response);
      } catch (error) {
        console.error('TestProductList: Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1>Test Product List</h1>
      <div className="mt-4">
        <h2>Raw Data:</h2>
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
      
      {data?.data && Array.isArray(data.data) && (
        <div className="mt-4">
          <h2>Items ({data.data.length}):</h2>
          <ul className="list-disc pl-4">
            {data.data.map((item, index) => (
              <li key={index}>
                {item.name} - Type: {item.type} - Category: {item.category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestProductList;
