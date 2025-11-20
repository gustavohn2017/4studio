import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (isProd && !API_BASE_URL) {
  throw new Error(
    'A variável de ambiente NEXT_PUBLIC_API_BASE_URL não está definida para o ambiente de produção.'
  );
}

const api = axios.create({
  // Use a URL da variável de ambiente ou o padrão para desenvolvimento
  baseURL: API_BASE_URL || 'http://localhost:8000/api',
  withCredentials: true,
});

export default api;
