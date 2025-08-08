// components/Cart.jsx
import { useEffect, useState } from "react";
import {
  getMyCart,
  updateItemQuantity,
  removeItemFromCart,
  clearMyCart,
} from "../../service/CartService";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMyCart();
      setCart(data || { items: [] });
    } catch (err) {
      console.error("Error cargando el carrito:", err);
      setError("Error cargando el carrito");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (itemId, quantity) => {
    if (quantity < 1) return; // prevenir cantidad inválida
    try {
      await updateItemQuantity(itemId, quantity);
      fetchCart();
    } catch (err) {
      console.error("Error actualizando cantidad:", err);
      alert("Error actualizando cantidad");
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeItemFromCart(itemId);
      fetchCart();
    } catch (err) {
      console.error("Error eliminando producto:", err);
      alert("Error eliminando producto");
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm("¿Querés vaciar el carrito?")) return;
    try {
      await clearMyCart();
      fetchCart();
    } catch (err) {
      console.error("Error vaciando el carrito:", err);
      alert("Error vaciando el carrito");
    }
  };

  if (loading) return <p>Cargando carrito...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!cart || !cart.items) return <p>Error al obtener el carrito.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tu carrito</h2>
      {cart.items.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          {cart.items.map((item) => (
            <div key={item.id} className="border p-2 my-2 rounded">
              <p>
                {item.productSize?.product?.name || "Producto desconocido"} -{" "}
                {item.productSize?.size || "Talle no disponible"} - Cantidad:{" "}
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.id,
                      Math.max(1, parseInt(e.target.value) || 1)
                    )
                  }
                  className="border rounded w-16 p-1"
                />
              </p>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded mt-2"
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            onClick={handleClearCart}
            className="bg-red-700 text-white px-4 py-2 rounded mt-4"
          >
            Vaciar carrito
          </button>
        </div>
      )}
    </div>
  );
}
