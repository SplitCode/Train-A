export interface AuthRequest {
  email: string;
  password: string;
}

export type AuthResponse = {
  token: string;
};

export interface ServerError {
  email?: string;
  password?: string;
  general?: string;
}
