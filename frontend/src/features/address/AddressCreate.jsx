import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createAddress } from "../../service/addressService"; // asumo que tenés este service

export default function CreateAddress() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get("next") || "/";

  const [form, setForm] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    phone: "",
    is_default: true, // como primera dirección, la marcamos default
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createAddress(form);
      // Redirigimos a la ruta que indique el query param next
      navigate(next);
    } catch (err) {
      console.error(err);
      setError("No se pudo crear la dirección. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Agregar Dirección</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="street"
          placeholder="Calle y número"
          value={form.street}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          value={form.city}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="Provincia/Estado"
          value={form.state}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="country"
          placeholder="País"
          value={form.country}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="postal_code"
          placeholder="Código Postal"
          value={form.postal_code}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Teléfono (opcional)"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            name="is_default"
            checked={form.is_default}
            onChange={handleChange}
          />
          <span>Marcar como dirección predeterminada</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Guardar Dirección"}
        </button>
      </form>
    </div>
  );
}
