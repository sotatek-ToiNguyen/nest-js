import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@modules/user/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import * as path from 'path';
dotenv.config();
console.log(process.env.DB_USERNAME);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
      synchronize: false,
    }),
    AuthModule,
    UsersModule
  ],
  providers: [AppService],
})
export class AppModule {}
