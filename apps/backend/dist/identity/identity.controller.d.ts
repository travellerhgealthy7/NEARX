import { CreateUserDto, LoginDto } from './dto';
import { IdentityService } from './identity.service';
export declare class IdentityController {
    private readonly identityService;
    constructor(identityService: IdentityService);
    healthCheck(): {
        service: string;
        status: string;
        timestamp: string;
    };
    register(payload: CreateUserDto): {
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
}
