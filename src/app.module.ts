import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './modules/books/books.module';
import { typeOrmConfig } from './config/typeorm.config';
import { DestinationModule } from './modules/destination/destination.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdditionalModule } from './modules/additional/additional.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    BooksModule,
    DestinationModule,
    UsersModule,
    AuthModule,
    AdditionalModule,
  ],
})
export class AppModule {}
