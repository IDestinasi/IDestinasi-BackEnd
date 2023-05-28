import { JwtModuleOptions, JwtSignOptions } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Inject } from "@nestjs/common";

import env from "./env";

// import env
export const jwtConfig: JwtModuleOptions = {
  secret: env.JWT_SECRET,
  signOptions: {
    // expires 1d
    expiresIn: 86400,
  },
};

export const refreshTokenConfig: JwtSignOptions = {
  // expires 1 week
  expiresIn: 604800,
};
