import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  getProductById,
  updateProduct,
  getAllCategories,
} from "../../service/ProductService";

export default function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "", // string para input, luego parseamos a número
    image: "",
    category_id: "",
    sizes: [{ size: "", stock: "", weight: "", length: "", width: "", height: "" }],
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch((err) => console.error("Error cargando categorías:", err));
  }, []);

  useEffect(() => {
    if (isEdit) {
      getProductById(id)
        .then((data) => {
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
                    length:
                      s.length !== null && s.length !== undefined
                        ? s.length.toString()
                        : "",
                    width:
                      s.width !== null && s.width !== undefined
                        ? s.width.toString()
                        : "",
                    height:
                      s.height !== null && s.height !== undefined
                        ? s.height.toString()
                        : "",
                  }))
                : [{ size: "", stock: "", weight: "", length: "", width: "", height: "" }],
          });
        })
        .catch(console.error);
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (index, e) => {
    const newSizes = [...form.sizes];
    newSizes[index][e.target.name] = e.target.value;
    setForm({ ...form, sizes: newSizes });
  };

  const addSize = () => {
    setForm({
      ...form,
      sizes: [
        ...form.sizes,
        { size: "", stock: "", weight: "", length: "", width: "", height: "" },
      ],
    });
  };

  const removeSize = (index) => {
    const newSizes = form.sizes.filter((_, i) => i !== index);
    setForm({
      ...form,
      sizes: newSizes.length
        ? newSizes
        : [{ size: "", stock: "", weight: "", length: "", width: "", height: "" }],
    });
  };

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
        alert("El peso debe ser un número mayor a 0");
        return;
      }
      // Validar dimensiones solo si vienen definidas (no vacías)
      if (
        s.length.trim() !== "" &&
        (isNaN(Number(s.length)) || Number(s.length) <= 0)
      ) {
        alert("El largo debe ser un número positivo");
        return;
      }
      if (
        s.width.trim() !== "" &&
        (isNaN(Number(s.width)) || Number(s.width) <= 0)
      ) {
        alert("El ancho debe ser un número positivo");
        return;
      }
      if (
        s.height.trim() !== "" &&
        (isNaN(Number(s.height)) || Number(s.height) <= 0)
      ) {
        alert("El alto debe ser un número positivo");
        return;
      }
    }

    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: parseFloat(form.price),
        image: form.image.trim(),
        category_id: form.category_id,
        sizes: form.sizes.map((s) => ({
          size: s.size.trim(),
          stock: parseInt(s.stock, 10),
          weight: parseFloat(s.weight),
          length: s.length.trim() !== "" ? parseFloat(s.length) : undefined,
          width: s.width.trim() !== "" ? parseFloat(s.width) : undefined,
          height: s.height.trim() !== "" ? parseFloat(s.height) : undefined,
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
              className="mb-4 p-4 border rounded flex flex-col gap-3"
            >
              <div className="flex gap-2 items-end">
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

              {/* Dimensiones opcionales */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm mb-1">Largo</label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    name="length"
                    value={size.length}
                    onChange={(e) => handleSizeChange(index, e)}
                    className="border px-2 py-1 w-full"
                    placeholder="Opcional"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm mb-1">Ancho</label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    name="width"
                    value={size.width}
                    onChange={(e) => handleSizeChange(index, e)}
                    className="border px-2 py-1 w-full"
                    placeholder="Opcional"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm mb-1">Alto</label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    name="height"
                    value={size.height}
                    onChange={(e) => handleSizeChange(index, e)}
                    className="border px-2 py-1 w-full"
                    placeholder="Opcional"
                  />
                </div>
              </div>
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
