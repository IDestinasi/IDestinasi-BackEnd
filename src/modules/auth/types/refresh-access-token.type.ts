import { IsNotEmpty } from "class-validator";

export class RefreshAccessTokenType {
  @IsNotEmpty()
  refresh_token: string;
}
