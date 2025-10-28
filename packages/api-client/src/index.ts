import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { z } from 'zod';

const healthResponseSchema = z.object({
  service: z.string(),
  status: z.string(),
  timestamp: z.string(),
});

const registerResponseSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phoneNumber: z.string().nullable().optional(),
});

const loginResponseSchema = z.object({
  token: z.string(),
  user: registerResponseSchema,
});

const registerPayloadSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().min(10).optional(),
  password: z.string().min(6),
});

const loginPayloadSchema = z.object({
  email: z.string().email().optional(),
  phoneNumber: z.string().min(10).optional(),
  password: z.string().min(6),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type RegisterPayload = z.infer<typeof registerPayloadSchema>;
export type LoginPayload = z.infer<typeof loginPayloadSchema>;

export interface NearxApiClientOptions {
  /** Base URL of the NEARX backend, e.g. http://localhost:3000/api */
  baseUrl: string;
  /** Optional Axios config overrides applied to every request */
  axiosConfig?: AxiosRequestConfig;
}

export interface NearxApiClient {
  health(): Promise<HealthResponse>;
  register(payload: RegisterPayload): Promise<RegisterResponse>;
  login(payload: LoginPayload): Promise<LoginResponse>;
}

/**
 * Create a thin API client for interacting with the NEARX backend services.
 */
export function createNearxApiClient({ baseUrl, axiosConfig }: NearxApiClientOptions): NearxApiClient {
  if (!baseUrl) {
    throw new Error('baseUrl is required to create a NEARX API client');
  }

  const http: AxiosInstance = axios.create({
    baseURL: baseUrl,
    ...axiosConfig,
  });

  return {
    async health() {
      const response = await http.get('/identity/health');
      return healthResponseSchema.parse(response.data);
    },

    async register(payload) {
      const request = registerPayloadSchema.parse(payload);
      const response = await http.post('/identity/register', request);
      return registerResponseSchema.parse(response.data);
    },

    async login(payload) {
      const request = loginPayloadSchema.parse(payload);
      const response = await http.post('/identity/login', request);
      return loginResponseSchema.parse(response.data);
    },
  };
}
