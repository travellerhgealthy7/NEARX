import { AxiosRequestConfig } from 'axios';
import { z } from 'zod';

declare const healthResponseSchema: z.ZodObject<{
    service: z.ZodString;
    status: z.ZodString;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    service: string;
    status: string;
    timestamp: string;
}, {
    service: string;
    status: string;
    timestamp: string;
}>;
declare const registerResponseSchema: z.ZodObject<{
    id: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phoneNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    firstName: string;
    lastName?: string | null | undefined;
    email?: string | null | undefined;
    phoneNumber?: string | null | undefined;
}, {
    id: string;
    firstName: string;
    lastName?: string | null | undefined;
    email?: string | null | undefined;
    phoneNumber?: string | null | undefined;
}>;
declare const loginResponseSchema: z.ZodObject<{
    token: z.ZodString;
    user: z.ZodObject<{
        id: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phoneNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        firstName: string;
        lastName?: string | null | undefined;
        email?: string | null | undefined;
        phoneNumber?: string | null | undefined;
    }, {
        id: string;
        firstName: string;
        lastName?: string | null | undefined;
        email?: string | null | undefined;
        phoneNumber?: string | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    token: string;
    user: {
        id: string;
        firstName: string;
        lastName?: string | null | undefined;
        email?: string | null | undefined;
        phoneNumber?: string | null | undefined;
    };
}, {
    token: string;
    user: {
        id: string;
        firstName: string;
        lastName?: string | null | undefined;
        email?: string | null | undefined;
        phoneNumber?: string | null | undefined;
    };
}>;
declare const registerPayloadSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    password: string;
    lastName?: string | undefined;
    email?: string | undefined;
    phoneNumber?: string | undefined;
}, {
    firstName: string;
    password: string;
    lastName?: string | undefined;
    email?: string | undefined;
    phoneNumber?: string | undefined;
}>;
declare const loginPayloadSchema: z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    email?: string | undefined;
    phoneNumber?: string | undefined;
}, {
    password: string;
    email?: string | undefined;
    phoneNumber?: string | undefined;
}>;
type HealthResponse = z.infer<typeof healthResponseSchema>;
type RegisterResponse = z.infer<typeof registerResponseSchema>;
type LoginResponse = z.infer<typeof loginResponseSchema>;
type RegisterPayload = z.infer<typeof registerPayloadSchema>;
type LoginPayload = z.infer<typeof loginPayloadSchema>;
interface NearxApiClientOptions {
    /** Base URL of the NEARX backend, e.g. http://localhost:3000/api */
    baseUrl: string;
    /** Optional Axios config overrides applied to every request */
    axiosConfig?: AxiosRequestConfig;
}
interface NearxApiClient {
    health(): Promise<HealthResponse>;
    register(payload: RegisterPayload): Promise<RegisterResponse>;
    login(payload: LoginPayload): Promise<LoginResponse>;
}
/**
 * Create a thin API client for interacting with the NEARX backend services.
 */
declare function createNearxApiClient({ baseUrl, axiosConfig }: NearxApiClientOptions): NearxApiClient;

export { type HealthResponse, type LoginPayload, type LoginResponse, type NearxApiClient, type NearxApiClientOptions, type RegisterPayload, type RegisterResponse, createNearxApiClient };
