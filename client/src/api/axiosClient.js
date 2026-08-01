import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Clerk's getToken() is async and its identity can change across
// renders, so we keep the *current* getter in a mutable ref rather than
// re-creating the interceptor (which would stack a new one on every
// render otherwise).
let currentGetToken = null;

export function setAuthTokenGetter(getToken) {
  currentGetToken = getToken;
}

axiosClient.interceptors.request.use(async (config) => {
  const token = await currentGetToken?.();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
