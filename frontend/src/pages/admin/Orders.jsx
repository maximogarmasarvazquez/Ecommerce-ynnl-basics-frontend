import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Órdenes</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Pedido #{order.id} - {order.status} - {order.total}
          </li>
        ))}
      </ul>
    </div>
  );
}
