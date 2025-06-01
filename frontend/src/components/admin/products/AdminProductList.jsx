import React, { useState, useEffect } from "react";
import { getAllProducts } from "@/services/productService";

const AdminProductList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('AdminProductList: Starting fetch...');
        const response = await getAllProducts();
        console.log('AdminProductList: Response received:', response);
        setData(response);
      } catch (error) {
        console.error('AdminProductList: Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Manajemen Produk</h1>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Manajemen Produk</h1>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manajemen Produk - Debug Mode</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Raw API Response:</h2>
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-96 border">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
      
      {data?.data && Array.isArray(data.data) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Parsed Items ({data.data.length}):</h2>
          <div className="bg-white border rounded p-4">
            {data.data.map((item, index) => (
              <div key={index} className="border-b py-2 last:border-b-0">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-600">
                  Type: {item.type} | Category: {item.category} | Price: {item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(!data?.data || !Array.isArray(data.data)) && (
        <div className="text-red-500">
          Data is not in expected format. Expected array in data property.
        </div>
      )}
    </div>
  );
};

export default AdminProductList;
