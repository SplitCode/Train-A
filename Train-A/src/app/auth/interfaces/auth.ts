export interface AuthRequest {
  email: string;
  password: string;
}

export interface ServerError {
  email?: string;
  password?: string;
  general?: string;
}
