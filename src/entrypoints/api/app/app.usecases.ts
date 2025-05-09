import { Injectable } from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { Authentication } from '../../../contracts/authentication';

const sleep = (timeout_ms) => new Promise((resolve) => setTimeout(resolve, timeout_ms));

@Injectable()
export class AppUsecases {
	constructor(
    private readonly authService: AuthService,

  ) {}

	async login(dto: Authentication.LoginRequest): Promise<Authentication.LoginResponse> {
    const response = new Authentication.LoginResponse();
    const validated = await this.authService.authenticate(dto.login, dto.password);
    if(validated) {
      // generate jwt token, refresh token
      response.success = true;
      const payload = { id: dto.login };
      response.token = await this.authService.generateAccessToken(payload);
      response.refreshToken = await this.authService.generateRefreshToken(payload);
    } else {
      response.success = false;
    }
    return Promise.resolve(response);
  }
}
