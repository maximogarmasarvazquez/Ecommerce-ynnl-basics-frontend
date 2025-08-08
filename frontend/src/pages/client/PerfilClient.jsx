import { useEffect, useState } from "react";
import axios from "axios";

export default function PerfilCliente() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.id || !token) return;

    axios.get(`http://localhost:3000/users/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setUsuario(res.data))
    .catch((err) => console.error("Error al obtener perfil", err));
  }, []);

  if (!usuario) return <div className="p-6">Cargando perfil...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Perfil del Cliente</h1>
      <p><strong>Nombre:</strong> {usuario.name}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Rol:</strong> {usuario.role}</p>
    </div>
  );
}
