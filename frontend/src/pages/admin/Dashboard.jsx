export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Panel de Administrador</h1>
      <p>Bienvenido, {user?.email}</p>
    </div>
  );
}
