import { useEffect, useState } from "react";

export default function ShippingCostCalculator({
  addressPostalCode,
  cartItems,
  onCostCalculated
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchShippingCost() {
      if (!addressPostalCode || cartItems.length === 0) return;

      setLoading(true);
      try {
        // Calcular peso total del carrito
        const totalWeight = cartItems.reduce(
          (sum, item) => sum + (item.productSize?.weight || 1) * item.quantity,
          0
        );

        const res = await fetch("/calculate-shipping", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cpOrigen: "1000", // tu código postal de origen
            cpDestino: addressPostalCode,
            provinciaOrigen: "AR-B", // provincia origen fija
            provinciaDestino: "AR-S", // podríamos mapear desde la dirección
            peso: totalWeight
          })
        });

        const data = await res.json();
        // Tomamos el costo a domicilio como predeterminado
        if (data.paqarClasico?.aDomicilio) {
          onCostCalculated(data.paqarClasico.aDomicilio);
        }
      } catch (err) {
        console.error("Error calculando envío:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchShippingCost();
  }, [addressPostalCode, cartItems]);

  if (loading) return <p>Calculando costo de envío...</p>;

  return null;
}