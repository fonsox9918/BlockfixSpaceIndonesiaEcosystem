import React, { useState, useEffect } from "react";
import axios from "axios";
import CheckoutButton from "@/components/common/CheckoutButton"; // Tombol untuk checkout
import { auth } from '@/firebase/firebaseConfig'; // Pastikan path ini benar

const CartPage = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const token = await getToken(); // Memanggil fungsi untuk mendapatkan token
      if (!token) {
        setError("Token tidak ditemukan.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`, // Mengirim token di header
          },
        });
        
        if (response.data.cartItems && response.data.cartItems.length > 0) {
          setCartItems(response.data.cartItems); // Memasukkan data produk keranjang
        } else {
          setError("Keranjang Anda kosong.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Gagal mengambil data keranjang");
        setLoading(false);
      }
    };

    fetchCart();
  }, []); // Menggunakan [] berarti efek ini hanya dijalankan sekali ketika komponen pertama kali dimuat

  if (loading) {
    return (
      <div className="text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Keranjang Belanja</h1>
      {cartItems.length === 0 ? (
        <p>Keranjang Anda kosong.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.product_id}>
                <div>
                  <p>{item.product_name}</p>
                  <p>Harga: {item.price}</p>
                  <p>Jumlah: {item.qty}</p>
                </div>
              </li>
            ))}
          </ul>
          <CheckoutButton />
        </div>
      )}
    </div>
  );
};

export default CartPage;