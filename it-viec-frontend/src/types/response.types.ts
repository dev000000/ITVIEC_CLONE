import type { Role } from "./common.types";

export interface APIResponse<T> {
  code: number;
  message: string;
  result: T;
}

export interface AuthenticationResponse {
  authenticated: boolean;
  id: string;
  email: string;
  role: Role;
}