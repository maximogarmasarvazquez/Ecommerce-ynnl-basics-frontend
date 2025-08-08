import { useEffect, useState } from "react";
import { getAllProducts, deleteProductById } from "../../service/ProductService";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error al obtener productos", err);
      alert("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este producto?")) return;
    try {
      await deleteProductById(id);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar producto");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Productos</h2>
        <Link
          to="/admin/products/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear Producto
        </Link>
      </div>

      {loading ? (
        <p>Cargando productos...</p>
      ) : products.length === 0 ? (
        <p>No hay productos cargados.</p>
      ) : (
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Precio</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="text-center">
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">${parseFloat(p.price).toFixed(2)}</td>
                <td className="p-2 border">
                  <Link
                    to={`/admin/products/edit/${p.id}`}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
