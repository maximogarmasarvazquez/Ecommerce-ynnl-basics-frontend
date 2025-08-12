import { useState } from "react";
import { createAddress } from "../../service/addressService"; // Asegúrate que esta función exista

export default function AddressForm({ onAddressCreated }) {
  const [form, setForm] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const newAddress = await createAddress(form);
      alert("Dirección creada correctamente");
      onAddressCreated(newAddress);
      setForm({
        street: "",
        city: "",
        state: "",
        country: "",
        postal_code: "",
        phone: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Error creando dirección");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      {error && <p className="text-red-600">{error}</p>}

      <input
        name="street"
        placeholder="Calle"
        value={form.street}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2 w-full"
      />
      <input
        name="city"
        placeholder="Ciudad"
        value={form.city}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2 w-full"
      />
      <input
        name="state"
        placeholder="Provincia / Estado"
        value={form.state}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2 w-full"
      />
      <input
        name="country"
        placeholder="País"
        value={form.country}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2 w-full"
      />
      <input
        name="postal_code"
        placeholder="Código Postal"
        value={form.postal_code}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2 w-full"
      />
      <input
        name="phone"
        placeholder="Teléfono (opcional)"
        value={form.phone}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
      >
        Guardar dirección
      </button>
    </form>
  );
}
