const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'https://v6.exchangerate-api.com/v6';
const API_KEY = process.env.EXCHANGE_API_KEY;

const obtenerTasaCambio = async (monedaBase = 'USD', monedaDestino = 'MXN') => {
  const url = `${BASE_URL}/${API_KEY}/pair/${monedaBase}/${monedaDestino}`;
  console.log('➡️ URL solicitada:', url);
  const response = await axios.get(url);
  return response.data.conversion_rate;
};

const convertirPrecio = async (precio, monedaDestino, monedaBase = 'USD') => {
  const tasa = await obtenerTasaCambio(monedaBase, monedaDestino);
  const convertido = precio * tasa;
  return { tasa, precioConvertido: convertido.toFixed(2) };
};

module.exports = {
  obtenerTasaCambio,
  convertirPrecio
};
