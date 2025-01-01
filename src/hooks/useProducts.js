// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; 
import useAuth from '@hooks/useAuth'; 

const useProducts = () => {
  const { token } = useAuth(); // Obtenemos el token desde el hook de autenticación
  const [products, setProducts] = useState([]);
  const router = useRouter(); 

  const fetchProducts = async () => {
    if (!token) {
      router.push("/login"); // Redirigir al login si no hay token
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/products", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
        console.error("API response is not an array:", data);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  const deleteProduct = async (id, token) => {
    try {
      const response = await fetch(`http://localhost:8000/products/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchProducts(); // Refrescamos la lista de productos después de eliminar
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  return { products, fetchProducts, deleteProduct };
};

export default useProducts;
