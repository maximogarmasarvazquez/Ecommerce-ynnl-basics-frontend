import axios from "axios";
import { getAuthConfig } from "./getAuthConfig";
const API_URL = "http://localhost:3000/orders";



export const createOrder = async (orderData) => {
  const res = await axios.post(API_URL, orderData, getAuthConfig());
  return res.data;
};

export const getOrdersByUser = async () => {
  const res = await axios.get(API_URL + "/mine", getAuthConfig());
  return res.data;
};
