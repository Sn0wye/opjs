import axios from 'axios';

export const baseURL = 'https://oopjs-production.up.railway.app';

export const api = axios.create({
  baseURL
});
