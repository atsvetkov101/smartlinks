import { Injectable } from '@nestjs/common';
import { AuthHelper } from '../../../core/auth/auth-helper';
import { JwtService } from '@nestjs/jwt';

const ACCESS_TOKEN_EXPIRE_SECONDS = 300; // 5 мин
const REFRESH_TOKEN_EXPIRE_SECONDS = 60*60*24; // 1 день

@Injectable()
export class AuthService {

  constructor(
		private readonly jwtService: JwtService,
	) {}
  public async generateAccessToken(payload: any) {
    return this.jwtService.signAsync(payload, {
			expiresIn: ACCESS_TOKEN_EXPIRE_SECONDS
		});
  }
  public async generateRefreshToken(payload: any) {
    return this.jwtService.signAsync(payload, {
			expiresIn: REFRESH_TOKEN_EXPIRE_SECONDS
		});
  }
  public async authenticate(login: string, password: string) {
    return AuthHelper.login(login, password);
  }
}

