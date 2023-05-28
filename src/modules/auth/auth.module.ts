import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { jwtConfig } from "src/config/jwt.config";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { RefreshTokenRepository } from "./repository/refresh-token.repository";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    UsersModule,
    // TypeOrmModule.forFeature([RefreshTokenRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
