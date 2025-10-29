import { CreateUserDto, LoginDto } from './dto';
export declare class IdentityService {
    private readonly users;
    private readonly userIndex;
    private sanitizeUser;
    getHealthStatus(): {
        service: string;
        status: string;
        timestamp: string;
    };
    registerUser(payload: CreateUserDto): {
        firstName: string;
        lastName?: string;
        email?: string;
        phoneNumber?: string;
        id: string;
    };
    login(payload: LoginDto): {
        token: string;
        user: {
            firstName: string;
            lastName?: string;
            email?: string;
            phoneNumber?: string;
            id: string;
        };
    };
    getUserProfile(userId: string): {
        firstName: string;
        lastName?: string;
        email?: string;
        phoneNumber?: string;
        id: string;
    } | undefined;
}
