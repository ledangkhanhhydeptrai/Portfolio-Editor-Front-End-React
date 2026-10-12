export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  email: string;
  username: string;
  role: "USER" | "ADMIN";
}
