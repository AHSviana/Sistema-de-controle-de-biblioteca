// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // ajuste se back estiver em outro host/porta
  headers: { 'Content-Type': 'application/json' }
});

export default api;
