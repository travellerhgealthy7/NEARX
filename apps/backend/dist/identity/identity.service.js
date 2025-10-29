"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let IdentityService = class IdentityService {
    constructor() {
        this.users = new Map();
        this.userIndex = new Map();
    }
    sanitizeUser(user) {
        const { password } = user, rest = __rest(user, ["password"]);
        void password;
        return rest;
    }
    getHealthStatus() {
        return {
            service: 'identity',
            status: 'ok',
            timestamp: new Date().toISOString(),
        };
    }
    registerUser(payload) {
        const contactKeys = [payload.email, payload.phoneNumber].filter(Boolean);
        if (contactKeys.length === 0) {
            throw new common_1.BadRequestException('Either email or phone number must be provided');
        }
        if (contactKeys.some((contact) => this.userIndex.has(contact))) {
            throw new common_1.ConflictException('User already exists');
        }
        const id = (0, crypto_1.randomUUID)();
        const userRecord = Object.assign({ id }, payload);
        this.users.set(id, userRecord);
        contactKeys.forEach((contact) => this.userIndex.set(contact, id));
        return this.sanitizeUser(userRecord);
    }
    login(payload) {
        var _a;
        const contact = (_a = payload.email) !== null && _a !== void 0 ? _a : payload.phoneNumber;
        if (!contact) {
            throw new common_1.BadRequestException('Email or phone number is required');
        }
        const userId = this.userIndex.get(contact);
        if (!userId) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const existing = this.users.get(userId);
        if (!existing || existing.password !== payload.password) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return {
            token: `stub-token-${existing.id}`,
            user: this.sanitizeUser(existing),
        };
    }
    getUserProfile(userId) {
        const user = this.users.get(userId);
        return user ? this.sanitizeUser(user) : undefined;
    }
};
exports.IdentityService = IdentityService;
exports.IdentityService = IdentityService = __decorate([
    (0, common_1.Injectable)()
], IdentityService);
//# sourceMappingURL=identity.service.js.map