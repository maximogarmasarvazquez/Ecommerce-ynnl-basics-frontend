import axios from "axios";
import { getAuthConfig } from "./getAuthConfig";
const API_URL = "http://localhost:3000";

export const getUserAddresses = async () => {
  const res = await axios.get(`${API_URL}/addresses`, getAuthConfig());
  return res.data;
};

export const createAddress = async (addressData) => {
  const res = await axios.post(`${API_URL}/addresses`, addressData, getAuthConfig());
  return res.data;
};

export const updateAddress = async (id, addressData) => {
  const res = await axios.put(`${API_URL}/addresses/${id}`, addressData, getAuthConfig());
  return res.data;
};

export const deleteAddress = async (id) => {
  await axios.delete(`${API_URL}/addresses/${id}`, getAuthConfig());
};

export const setDefaultAddress = async (id) => {
  const res = await axios.patch(`${API_URL}/addresses/${id}/default`, null, getAuthConfig());
  return res.data;
};
