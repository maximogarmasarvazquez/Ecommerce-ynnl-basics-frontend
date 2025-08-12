import { useState, useEffect } from "react";
import ShippingCostCalculator from "./ShippingCostCalculator";
import { createOrder } from "../../service/orderService";
import { getUserAddresses } from "../../service/addressService";
import AddressForm from "../address/AddressForm";

const CORREO_ARGENTINO_ID = 1; // id fijo para Correo Argentino

export default function Checkout({ cartItems, onOrderCreated }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [shippingCost, setShippingCost] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const paymentMethod = "mercado_pago";

  useEffect(() => {
    async function loadAddresses() {
      setLoadingAddresses(true);
      try {
        const data = await getUserAddresses();
        setAddresses(data);
        if (data.length > 0) setSelectedAddressId(data[0].id);
        else setShowAddressForm(true);
      } catch {
        alert("Error cargando direcciones");
      } finally {
        setLoadingAddresses(false);
      }
    }
    loadAddresses();
  }, []);

  const handleShippingCostCalculated = (cost) => {
    setShippingCost(cost);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      alert("Debés seleccionar o crear una dirección");
      return;
    }

    try {
      const orderPayload = {
        shipping_id: CORREO_ARGENTINO_ID, // fijo Correo Argentino
        address_id: selectedAddressId,
        items: cartItems.map((item) => ({
          product_size_id: item.productSize.id,
          quantity: item.quantity,
        })),
        payment_method: paymentMethod,
      };

      const newOrder = await createOrder(orderPayload);

      alert(`Orden creada con éxito! ID: ${newOrder.id}`);
      onOrderCreated(newOrder);

      if (newOrder.payment && newOrder.payment.init_point) {
        window.location.href = newOrder.payment.init_point;
      }
    } catch {
      alert("Error al crear la orden");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {loadingAddresses ? (
        <p>Cargando direcciones...</p>
      ) : showAddressForm ? (
        <>
          <p>No tenés direcciones guardadas. Por favor, crea una:</p>
          <AddressForm
            onAddressCreated={(newAddress) => {
              setAddresses((prev) => [...prev, newAddress]);
              setSelectedAddressId(newAddress.id);
              setShowAddressForm(false);
            }}
          />
        </>
      ) : (
        <>
          <label className="block mb-2 font-semibold">
            Seleccioná una dirección:
          </label>
          <select
            value={selectedAddressId || ""}
            onChange={(e) => setSelectedAddressId(e.target.value)}
            className="border p-2 rounded w-full max-w-md mb-4"
          >
            {addresses.map((addr) => (
              <option key={addr.id} value={addr.id}>
                {addr.street}, {addr.city}, {addr.state}, {addr.country}{" "}
                {addr.is_default ? "(Predeterminada)" : ""}
              </option>
            ))}
          </select>
          <button
            className="mb-4 text-blue-600 underline"
            onClick={() => setShowAddressForm(true)}
            type="button"
          >
            Agregar nueva dirección
          </button>
        </>
      )}

      {/* ShippingCostCalculator recibe shippingId fijo */}
        <ShippingCostCalculator
          addressPostalCode={addresses.find((a) => a.id === selectedAddressId)?.postal_code}
          cartItems={cartItems}
          onCostCalculated={handleShippingCostCalculated}
          fixedShippingId={1} // siempre Correo Argentino, id=1
          onSelectShipping={() => {}}
        />

      {shippingCost !== null && (
        <p className="mt-2 font-semibold">
          Costo estimado de envío: ${shippingCost.toFixed(2)}
        </p>
      )}

      <div className="mt-4">
        <p className="font-semibold">Método de pago:</p>
        <p>Mercado Pago</p>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-green-600 text-white px-4 py-2 rounded mt-6"
      >
        Confirmar compra
      </button>
    </div>
  );
}
