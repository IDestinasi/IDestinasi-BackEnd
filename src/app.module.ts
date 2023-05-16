import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { DestinationModule } from "./modules/destination/destination.module";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AdditionalModule } from "./modules/additional/additional.module";
import { OrderModule } from "./modules/order/order.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    DestinationModule,
    UsersModule,
    AuthModule,
    AdditionalModule,
    OrderModule,
  ],
})
export class AppModule {}
