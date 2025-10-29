"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createNearxApiClient: () => createNearxApiClient
});
module.exports = __toCommonJS(index_exports);
var import_axios = __toESM(require("axios"));
var import_zod = require("zod");
var healthResponseSchema = import_zod.z.object({
  service: import_zod.z.string(),
  status: import_zod.z.string(),
  timestamp: import_zod.z.string()
});
var registerResponseSchema = import_zod.z.object({
  id: import_zod.z.string(),
  firstName: import_zod.z.string(),
  lastName: import_zod.z.string().nullable().optional(),
  email: import_zod.z.string().nullable().optional(),
  phoneNumber: import_zod.z.string().nullable().optional()
});
var loginResponseSchema = import_zod.z.object({
  token: import_zod.z.string(),
  user: registerResponseSchema
});
var registerPayloadSchema = import_zod.z.object({
  firstName: import_zod.z.string().min(3),
  lastName: import_zod.z.string().optional(),
  email: import_zod.z.string().email().optional(),
  phoneNumber: import_zod.z.string().min(10).optional(),
  password: import_zod.z.string().min(6)
});
var loginPayloadSchema = import_zod.z.object({
  email: import_zod.z.string().email().optional(),
  phoneNumber: import_zod.z.string().min(10).optional(),
  password: import_zod.z.string().min(6)
});
function createNearxApiClient({ baseUrl, axiosConfig }) {
  if (!baseUrl) {
    throw new Error("baseUrl is required to create a NEARX API client");
  }
  const http = import_axios.default.create({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createNearxApiClient
});
