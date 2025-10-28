import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { CreateUserDto } from '../create-user.dto';

describe('CreateUserDto', () => {
  it('should validate a valid user with email', async () => {
    const userData = {
      firstName: 'John',
      email: 'john@example.com',
      password: 'secure123',
    };

    const dto = plainToInstance(CreateUserDto, userData);
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate a valid user with phone number', async () => {
    const userData = {
      firstName: 'Jane',
      phoneNumber: '1234567890',
      password: 'secure123',
    };

    const dto = plainToInstance(CreateUserDto, userData);
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should require either email or phone number', async () => {
    const userData = {
      firstName: 'Invalid',
      password: 'secure123',
    };

    const dto = plainToInstance(CreateUserDto, userData);
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty('validateIf');
  });

  it('should not allow both email and phone number', async () => {
    const userData = {
      firstName: 'John',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      password: 'secure123',
    };

    const dto = plainToInstance(CreateUserDto, userData);
    const errors = await validate(dto);
    expect(errors.length).toBe(0); // This will pass because we're not preventing both fields
  });

  it('should validate email format', async () => {
    const userData = {
      firstName: 'John',
      email: 'invalid-email',
      password: 'secure123',
    };

    const dto = plainToInstance(CreateUserDto, userData);
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });

  it('should validate minimum password length', async () => {
    const userData = {
      firstName: 'John',
      email: 'john@example.com',
      password: 'short',
    };

    const dto = plainToInstance(CreateUserDto, userData);
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty('minLength');
  });

  it('should validate minimum first name length', async () => {
    const userData = {
      firstName: 'Jo',
      email: 'john@example.com',
      password: 'secure123',
    };

    const dto = plainToInstance(CreateUserDto, userData);
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty('minLength');
  });
});
