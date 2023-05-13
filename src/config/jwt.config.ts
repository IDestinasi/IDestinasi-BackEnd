import { JwtModuleOptions, JwtSignOptions } from "@nestjs/jwt";

// import env
export const jwtConfig: JwtModuleOptions = {
  secret: "destinasiku",
  signOptions: {
    // expires 1d
    expiresIn: 86400,
  },
};

export const refreshTokenConfig: JwtSignOptions = {
  // expires 1 week
  expiresIn: 604800,
};
