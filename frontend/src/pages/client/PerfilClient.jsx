import { useEffect, useState } from "react";
import { getUserById } from "../../service/userService"; // importar service
import { getUser } from "../../service/authService";

export default function PerfilCliente() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = getUser();
    if (!user?.id) return;

    getUserById(user.id)
      .then(setUsuario)
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
