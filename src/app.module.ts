import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { DestinationModule } from "./modules/destination/destination.module";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AdditionalModule } from "./modules/additional/additional.module";
import { OrderModule } from "./modules/order/order.module";
import { PaymentModule } from "./modules/payment/payment.module";
import { ConfigModule } from "@nestjs/config";
import { FeedbackController } from "./modules/feedback/feedback.controller";
import { FeedbackModule } from "./modules/feedback/feedback.module";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    DestinationModule,
    UsersModule,
    AuthModule,
    AdditionalModule,
    OrderModule,
    PaymentModule,
    FeedbackModule,
    MulterModule.register({ dest: "../public/" }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FeedbackModule,
  ],
})
export class AppModule {}
