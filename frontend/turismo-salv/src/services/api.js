
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://DESKTOP-EDH81M5:5077/api',
});

export default api;
