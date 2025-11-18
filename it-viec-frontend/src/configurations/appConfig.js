
const Configs = {
  AUTH_MODE: import.meta.env.VITE_AUTH_MODE || "JWT",
  API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT || "http://localhost:8080",
};

export default Object.freeze(Configs);