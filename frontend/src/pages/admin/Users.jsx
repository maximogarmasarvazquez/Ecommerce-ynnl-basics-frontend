import UserList from "../../features/users/UserList";

export default function UsersPage() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
       
      </div>
      <UserList />
    </div>
  );
}
