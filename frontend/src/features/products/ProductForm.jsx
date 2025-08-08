import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  getProductById,
  updateProduct,
  getAllCategories,
} from "../../service/ProductService"; // Asumo tienes getCategories para listar categorías

export default function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category_id: "",
    sizes: [{ size: "", stock: "", weight: "" }],
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = !!id;

  // Cargar categorías para el select
  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch((err) => console.error("Error cargando categorías:", err));
  }, []);

  // Cargar producto para editar
  useEffect(() => {
    if (isEdit) {
      getProductById(id)
        .then((data) => {
          // Convertir price a string para input
          setForm({
            name: data.name || "",
            description: data.description || "",
            price: data.price?.toString() || "",
            image: data.image || "",
            category_id: data.category_id || "",
            sizes:
              data.sizes.length > 0
                ? data.sizes.map((s) => ({
                    size: s.size,
                    stock: s.stock.toString(),
                    weight: s.weight.toString(),
                  }))
                : [{ size: "", stock: "", weight: "" }],
          });
        })
        .catch(console.error);
    }
  }, [id]);

  // Cambios generales en inputs (name, description, etc)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Cambios en tamaños (sizes)
  const handleSizeChange = (index, e) => {
    const newSizes = [...form.sizes];
    newSizes[index][e.target.name] = e.target.value;
    setForm({ ...form, sizes: newSizes });
  };

  // Agregar tamaño
  const addSize = () => {
    setForm({
      ...form,
      sizes: [...form.sizes, { size: "", stock: "", weight: "" }],
    });
  };

  // Eliminar tamaño
  const removeSize = (index) => {
    const newSizes = form.sizes.filter((_, i) => i !== index);
    setForm({ ...form, sizes: newSizes.length ? newSizes : [{ size: "", stock: "", weight: "" }] });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!form.name.trim()) {
      alert("El nombre es obligatorio");
      return;
    }
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) {
      alert("El precio debe ser un número positivo");
      return;
    }
    if (!form.category_id) {
      alert("Debe seleccionar una categoría");
      return;
    }

    // Validar sizes
    for (const s of form.sizes) {
      if (!s.size.trim()) {
        alert("Cada tamaño debe tener un valor para 'size'");
        return;
      }
      if (isNaN(Number(s.stock)) || Number(s.stock) < 0) {
        alert("El stock debe ser un número mayor o igual a 0");
        return;
      }
      if (isNaN(Number(s.weight)) || Number(s.weight) <= 0) {
        alert("El weight debe ser un número mayor a 0");
        return;
      }
    }

    try {
      // Convertir price, stock y weight a números
      const payload = {
        ...form,
        price: Number(form.price),
        sizes: form.sizes.map((s) => ({
          size: s.size,
          stock: Number(s.stock),
          weight: Number(s.weight),
        })),
      };

      if (isEdit) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }
      navigate("/admin/products");
    } catch (err) {
      console.error("Error al guardar producto:", err);
      alert("Error al guardar producto");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? "Editar Producto" : "Crear Producto"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
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

        <div>
          <label className="block mb-1 font-medium">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            rows={3}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Precio</label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Imagen (URL)</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Categoría</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          >
            <option value="">-- Seleccione una categoría --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Tamaños</label>
          {form.sizes.map((size, index) => (
            <div
              key={index}
              className="mb-2 p-2 border rounded flex gap-2 items-end"
            >
              <div className="flex-1">
                <label className="block text-sm mb-1">Tamaño</label>
                <input
                  type="text"
                  name="size"
                  value={size.size}
                  onChange={(e) => handleSizeChange(index, e)}
                  className="border px-2 py-1 w-full"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-1">Stock</label>
                <input
                  type="number"
                  min="0"
                  name="stock"
                  value={size.stock}
                  onChange={(e) => handleSizeChange(index, e)}
                  className="border px-2 py-1 w-full"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-1">Peso</label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  name="weight"
                  value={size.weight}
                  onChange={(e) => handleSizeChange(index, e)}
                  className="border px-2 py-1 w-full"
                  required
                />
              </div>
              <button
                type="button"
                className="text-red-600 font-bold text-xl px-2"
                onClick={() => removeSize(index)}
                title="Eliminar tamaño"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSize}
            className="btn btn-secondary mt-2"
          >
            + Agregar tamaño
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          {isEdit ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
}
