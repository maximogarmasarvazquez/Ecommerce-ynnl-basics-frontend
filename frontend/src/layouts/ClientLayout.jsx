import NavbarClient from "../components/client/NavbarClient";
import { Outlet } from "react-router-dom";

export default function LayoutCliente() {
  return (
    <>
      <NavbarClient />
      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
}
