import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createUser,
  getUserById,
  updateUser,
} from "../../service/userService";

const roles = [
  { value: "client", label: "Cliente" },
  { value: "admin", label: "Admin" },
];

export default function UserForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "client",
    password: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      getUserById(id)
        .then((user) => {
          setForm({
            name: user.name || "",
            email: user.email || "",
            role: user.role || "client",
            password: "", // vaciar password en edición
          });
        })
        .catch((err) => {
          console.error("Error cargando usuario:", err);
          alert("No se pudo cargar el usuario.");
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones simples
    if (!form.name.trim()) {
      alert("El nombre es obligatorio");
      return;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      alert("Email inválido");
      return;
    }
    if (!isEdit && form.password.trim().length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (isEdit && form.password && form.password.length > 0 && form.password.length < 6) {
      alert("Si cambias la contraseña, debe tener al menos 6 caracteres");
      return;
    }
    if (!roles.some((r) => r.value === form.role)) {
      alert("Rol inválido");
      return;
    }

    try {
      const payload = { ...form };
      if (isEdit && !payload.password) {
        delete payload.password; // no actualizar password si está vacío
      }
      if (!isEdit) {
        // en creación la password es obligatoria
        if (!payload.password) {
          alert("La contraseña es obligatoria");
          return;
        }
      }

      if (isEdit) {
        await updateUser(id, payload);
      } else {
        await createUser(payload);
      }
      navigate("/admin/users");
    } catch (err) {
      console.error("Error al guardar usuario:", err);
      alert(err.response?.data?.error || "Error al guardar usuario");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? "Editar Usuario" : "Crear Usuario"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
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
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Rol</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          >
            {roles.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Contraseña {isEdit && "(dejar vacío para no cambiar)"}
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            autoComplete={isEdit ? "new-password" : "off"}
            {...(!isEdit && { required: true })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {isEdit ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
}
