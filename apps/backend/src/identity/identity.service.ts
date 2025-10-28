import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto, LoginDto } from './dto';

@Injectable()
export class IdentityService {
  private readonly users = new Map<string, (CreateUserDto & { id: string })>();
  private readonly userIndex = new Map<string, string>();

  private sanitizeUser(user: CreateUserDto & { id: string }) {
    const { password, ...rest } = user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  registerUser(payload: CreateUserDto) {
    const contactKeys = [payload.email, payload.phoneNumber].filter(Boolean) as string[];

    if (contactKeys.length === 0) {
      throw new BadRequestException('Either email or phone number must be provided');
    }

    if (contactKeys.some((contact) => this.userIndex.has(contact))) {
      throw new ConflictException('User already exists');
    }

    const id = randomUUID();
    const userRecord = { id, ...payload };
    this.users.set(id, userRecord);
    contactKeys.forEach((contact) => this.userIndex.set(contact, id));

    return this.sanitizeUser(userRecord);
  }

  login(payload: LoginDto) {
    const contact = payload.email ?? payload.phoneNumber;
    if (!contact) {
      throw new BadRequestException('Email or phone number is required');
    }

    const userId = this.userIndex.get(contact);
    if (!userId) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const existing = this.users.get(userId);
    if (!existing || existing.password !== payload.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      token: `stub-token-${existing.id}`,
      user: this.sanitizeUser(existing),
    };
  }
}
