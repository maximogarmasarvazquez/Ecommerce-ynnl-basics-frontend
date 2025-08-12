import { useEffect, useState } from "react";
import { getAllProducts } from "../../service/ProductService";

export default function HomeCliente() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProductos(res);
        setError(null);
      })
      .catch((err) => {
        console.error("Error al obtener productos", err);
        setError("No se pudieron cargar los productos");
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Productos Disponibles</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="border rounded shadow p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold mb-2">
                {producto.name || producto.nombre}
              </h2>
              <p className="mb-2 text-gray-700">
                {producto.description || producto.descripcion}
              </p>
            </div>
            <p className="text-green-600 font-bold text-lg">
              ${producto.price || producto.precio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
