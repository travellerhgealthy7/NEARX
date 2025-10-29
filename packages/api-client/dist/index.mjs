// src/index.ts
import axios from "axios";
import { z } from "zod";
var healthResponseSchema = z.object({
  service: z.string(),
  status: z.string(),
  timestamp: z.string()
});
var registerResponseSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phoneNumber: z.string().nullable().optional()
});
var loginResponseSchema = z.object({
  token: z.string(),
  user: registerResponseSchema
});
var registerPayloadSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().min(10).optional(),
  password: z.string().min(6)
});
var loginPayloadSchema = z.object({
  email: z.string().email().optional(),
  phoneNumber: z.string().min(10).optional(),
  password: z.string().min(6)
});
function createNearxApiClient({ baseUrl, axiosConfig }) {
  if (!baseUrl) {
    throw new Error("baseUrl is required to create a NEARX API client");
  }
  const http = axios.create({
    baseURL: baseUrl,
    ...axiosConfig
  });
  return {
    async health() {
      const response = await http.get("/identity/health");
      return healthResponseSchema.parse(response.data);
    },
    async register(payload) {
      const request = registerPayloadSchema.parse(payload);
      const response = await http.post("/identity/register", request);
      return registerResponseSchema.parse(response.data);
    },
    async login(payload) {
      const request = loginPayloadSchema.parse(payload);
      const response = await http.post("/identity/login", request);
      return loginResponseSchema.parse(response.data);
    }
  };
}
export {
  createNearxApiClient
};
