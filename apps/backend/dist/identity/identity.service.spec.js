"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const identity_service_1 = require("./identity.service");
describe('IdentityService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [identity_service_1.IdentityService],
        }).compile();
        service = module.get(identity_service_1.IdentityService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('getHealthStatus', () => {
        it('should return health status', () => {
            const health = service.getHealthStatus();
            expect(health).toEqual({
                service: 'identity',
                status: 'ok',
                timestamp: expect.any(String),
            });
            expect(() => new Date(health.timestamp).toISOString()).not.toThrow();
        });
    });
    describe('registerUser', () => {
        const validUser = {
            firstName: 'John',
            email: 'john@example.com',
            password: 'secure123',
        };
        it('should register a new user with email', () => {
            const result = service.registerUser(validUser);
            expect(result).toMatchObject({
                id: expect.any(String),
                firstName: 'John',
                email: 'john@example.com',
            });
            expect(result).not.toHaveProperty('password');
        });
        it('should register a new user with phone number', () => {
            const userWithPhone = Object.assign(Object.assign({}, validUser), { email: undefined, phoneNumber: '+1234567890' });
            const result = service.registerUser(userWithPhone);
            expect(result).toMatchObject({
                id: expect.any(String),
                firstName: 'John',
                phoneNumber: '+1234567890',
            });
            expect(result).not.toHaveProperty('password');
        });
        it('should throw ConflictException when registering duplicate email', () => {
            service.registerUser(validUser);
            expect(() => service.registerUser(validUser)).toThrow(common_1.ConflictException);
        });
        it('should throw BadRequestException when no contact info provided', () => {
            const invalidUser = {
                firstName: 'John',
                password: 'secure123',
            };
            expect(() => service.registerUser(invalidUser)).toThrow(common_1.BadRequestException);
        });
    });
    describe('login', () => {
        const testUser = {
            firstName: 'Test',
            email: 'test@example.com',
            password: 'test123',
        };
        beforeEach(() => {
            service.registerUser(testUser);
        });
        it('should login with valid email and password', () => {
            const result = service.login({
                email: testUser.email,
                password: testUser.password,
            });
            expect(result).toMatchObject({
                id: expect.any(String),
                firstName: testUser.firstName,
                email: testUser.email,
            });
            expect(result).not.toHaveProperty('password');
        });
        it('should throw UnauthorizedException with invalid password', () => {
            expect(() => service.login({ email: testUser.email, password: 'wrong' })).toThrow('Invalid credentials');
        });
        it('should throw BadRequestException with no contact info', () => {
            expect(() => service.login({})).toThrow(common_1.BadRequestException);
        });
    });
    describe('getUserProfile', () => {
        const testUser = {
            firstName: 'Profile',
            email: 'profile@example.com',
            password: 'profile123',
        };
        let userId;
        beforeEach(() => {
            const result = service.registerUser(testUser);
            userId = result.id;
        });
        it('should return user profile by ID', () => {
            const profile = service.getUserProfile(userId);
            expect(profile).toMatchObject({
                id: userId,
                firstName: testUser.firstName,
                email: testUser.email,
            });
            expect(profile).not.toHaveProperty('password');
        });
        it('should return undefined for non-existent user', () => {
            const profile = service.getUserProfile('non-existent-id');
            expect(profile).toBeUndefined();
        });
    });
});
//# sourceMappingURL=identity.service.spec.js.map