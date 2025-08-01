import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Productos</h2>
      <ul>
        {products.map((prod) => (
          <li key={prod.id}>
            {prod.name} - ${prod.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
