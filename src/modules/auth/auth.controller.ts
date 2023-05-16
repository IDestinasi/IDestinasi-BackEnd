import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  Patch,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginType } from "./types/login.type";
import { LoginResponse } from "./interface/login-response.interface";
import { RefreshAccessTokenType } from "./types/refresh-access-token.type";
import { JwtGuard } from "src/guards/jwt.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async login(@Body() loginType: LoginType): Promise<LoginResponse> {
    return this.authService.login(loginType);
  }

  @Post("/refresh-token")
  async refreshToken(
    @Body() refreshTokenType: RefreshAccessTokenType
  ): Promise<{ access_token: string }> {
    return this.authService.refreshAccessToken(refreshTokenType);
  }

  @Patch("/:id/revoke")
  @UseGuards(JwtGuard)
  async revokeRefreshToken(@Param("id") id: string): Promise<void> {
    return this.authService.revokeRefreshToken(id);
  }
}
