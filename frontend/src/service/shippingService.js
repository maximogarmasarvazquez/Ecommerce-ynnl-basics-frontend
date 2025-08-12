import axios from "axios";

const API_URL = "http://localhost:3000/shippings"; // Ajusta según URL backend

export async function getShippings() {
  const res = await axios.get(API_URL);
  return res.data;
}

/**
 * Calcula el costo de envío llamando al backend
 * @param {Object} params
 * @param {string} params.shipping_id ID del método de envío seleccionado
 * @param {string} params.postal_code Código postal de destino
 * @param {Array} params.items Array con objetos { product_size_id, quantity }
 * @returns {Promise<Object>} { estimated_cost, estimated_days, total_weight }
 */
export async function calculateShippingCost({ shipping_id, postal_code, items }) {
  const res = await axios.post(`${API_URL}/calculate-cost`, {
    shipping_id,
    postal_code,
    items,
  });
  return res.data;
}
