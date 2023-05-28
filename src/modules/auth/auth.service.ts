import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginType } from "./types/login.type";
import { LoginResponse } from "./interface/login-response.interface";
import { UsersService } from "../users/users.service";
import { User } from "../users/entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
// import { RefreshTokenRepository } from "./repository/refresh-token.repository";
import { refreshTokenConfig } from "src/config/jwt.config";
import { RefreshToken } from "./entity/refresh-token.entity";
import { RefreshAccessTokenType } from "./types/refresh-access-token.type";
import { TokenExpiredError } from "jsonwebtoken";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService // @InjectRepository(RefreshTokenRepository) // private readonly refreshTokenRepository: RefreshTokenRepository
  ) {}

  async login(loginType: LoginType): Promise<LoginResponse> {
    const { email, password } = loginType;

    const userService = await this.userService.validateUser(email, password);
    if (!userService) {
      throw new UnauthorizedException("wrong email and password");
    }

    const access_token = await this.createAccessToken(userService);

    // const refresh_token = await this.createRefreshToken(userService);

    return { access_token } as LoginResponse;
  }

  // async refreshAccessToken(
  //   refreshTokenType: RefreshAccessTokenType
  // ): Promise<{ access_token: string }> {
  //   const { refresh_token } = refreshTokenType;

  //   const payload = await this.decodeToken(refresh_token);

  //   const refreshToken = await this.refreshTokenRepository.findOne(
  //     payload.jid,
  //     { relations: ["user"] }
  //   );

  //   if (!refreshToken) {
  //     throw new UnauthorizedException("Refresh token not found");
  //   }

  //   if (refreshToken.isRevoked) {
  //     throw new UnauthorizedException("Refresh token revoked");
  //   }

  //   const access_token = await this.createAccessToken(refreshToken.user);

  //   return { access_token };
  // }

  async decodeToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException("Token expired");
      } else {
        throw new UnauthorizedException("Token error");
      }
    }
  }

  async createAccessToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return access_token;
  }

  // async createRefreshToken(user: User): Promise<string> {
  //   const refreshToken = await this.refreshTokenRepository.createRefreshToken(
  //     user,
  //     +refreshTokenConfig.expiresIn
  //   );

  //   const payload = {
  //     jid: refreshToken.id,
  //   };

  //   const refresh_token = await this.jwtService.signAsync(
  //     payload,
  //     refreshTokenConfig
  //   );

  //   return refresh_token;
  // }

  // async revokeRefreshToken(id: string): Promise<void> {
  //   const refreshToken = await this.refreshTokenRepository.findOne(id);

  //   if (!refreshToken) {
  //     throw new UnauthorizedException("Refresh token not found");
  //   }

  //   refreshToken.isRevoked = true;
  //   await refreshToken.save();
  // }

  async getUserById(id: string): Promise<User> {
    return User.findOne({
      where: { id },
    });
  }
}
