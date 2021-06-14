import { Module, Global } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';
import { BullModule } from '@nestjs/bull'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';

dotenv.config();
@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAIL_HOST,
          port: process.env.MAIL_PORT,
          secureConnection: false,
          auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
          },
          tls : {
            ciphers : ' SSLv3 '
          }
        },
        defaults: {
          from: process.env.MAIL_FROM_NAME,
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    BullModule.registerQueueAsync({
      name: "default",
      useFactory: () => ({
        redis: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT),
        },
      }),
    }),
  ],
  controllers: [],
  providers: [
    MailService,
  ],
  exports: [
    MailService,
  ]
})
export class MailModule {}
