import { useEffect, useState } from "react";
import { getAllProducts } from "../../service/ProductService";
import { addToCart } from "../../service/CartService";

export default function ProductsClient() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [addingId, setAddingId] = useState(null);

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProducts(data || []);
        setError(null);
      })
      .catch((err) => {
        console.error("Error al cargar productos", err);
        setError("No se pudieron cargar los productos");
      });
  }, []);

const [message, setMessage] = useState(null);

const handleAddToCart = async (productSizeId) => {
  try {
    setAddingId(productSizeId);
    await addToCart(productSizeId);
    setMessage("Producto agregado al carrito");
  } catch (error) {
    console.error("Error agregando producto al carrito:", error);
    setMessage("Error agregando producto al carrito");
  } finally {
    setAddingId(null);
    setTimeout(() => setMessage(null), 3000); // desaparece en 3 seg
  }
};

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!products.length) {
    return <p className="text-gray-500">No hay productos disponibles</p>;
  }

  return (
    <>
          {message && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
            {message}
          </div>
        )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {products.map((product) =>
          product.sizes?.map((size) => (
            <div
              key={size.id}
              className="border rounded p-4 flex flex-col justify-between"
            >
              <h3 className="font-semibold mb-2">
                {product.name} - Talle: {size.size}
              </h3>
              <p className="mb-4 font-bold text-green-700">${product.price}</p>
             <button onClick={() => handleAddToCart(size.id)}>Agregar al carrito</button>
              {addingId === size.id && (
                <p className="text-sm text-gray-500">Cargando...</p>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
