export interface SignUpRequest {
  email: string;
  password: string;
}

export interface ErrorResponse {
  error: {
    message: string;
    reason: string;
  };
}
