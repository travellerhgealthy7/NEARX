import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto';
import { IdentityService } from './identity.service';

@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Get('health')
  healthCheck() {
    return this.identityService.getHealthStatus();
  }

  @Post('register')
  register(@Body() payload: CreateUserDto) {
    return this.identityService.registerUser(payload);
  }

  @Post('login')
  login(@Body() payload: LoginDto) {
    return this.identityService.login(payload);
  }
}
