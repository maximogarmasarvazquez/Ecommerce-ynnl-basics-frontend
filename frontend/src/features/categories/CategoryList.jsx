import { useEffect, useState } from "react";
import { getAllCategories, deleteCategoryById } from "../../service/CategoryService";
import { Link } from "react-router-dom";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error al obtener categorías", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar esta categoría?")) return;
    try {
      await deleteCategoryById(id);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar categoría");
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Categorías</h2>
        <Link to="/admin/categories/create" className="btn btn-primary">
          Crear Categoría
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>
                <Link to={`/admin/categories/edit/${c.id}`} className="text-blue-500">
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-red-500 ml-2"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
