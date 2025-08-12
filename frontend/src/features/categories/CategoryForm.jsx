import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from "../../service/CategoryService";

export default function CategoryForm() {
  const [form, setForm] = useState({ name: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      getCategoryById(id).then(setForm).catch(console.error);
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateCategory(id, form);
      } else {
        await createCategory(form);
      }
      navigate("/admin/categories");
    } catch (err) {
      console.error("Error al guardar categoría:", err);
      alert("Error al guardar categoría");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? "Editar Categoría" : "Crear Categoría"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEdit ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
}
