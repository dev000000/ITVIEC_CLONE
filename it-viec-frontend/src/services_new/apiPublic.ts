import Configs from "@/configurations/appConfig";

const API_AUTH_PATH = `${Configs.API_ENDPOINT}/api/v1/auth`;

// Định nghĩa các đường dẫn API công khai mà không cần xác thực
const PUBLIC_API_PATH: readonly string[] = [
  `${API_AUTH_PATH}/login`,
  `${API_AUTH_PATH}/introspect`,
  `${API_AUTH_PATH}/refresh-token`,
];

export default PUBLIC_API_PATH;