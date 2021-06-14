import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { MailerService } from '@nestjs-modules/mailer';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  constructor(
    @InjectQueue('default')
    private mailQueue: Queue,
    private readonly mailerService: MailerService
  ) {}

  public sendMail(mailTo: string, subject: string, template: string, data: object): void {
    this
      .mailerService
      .sendMail({
        to: mailTo,
        from:  process.env.MAIL_FROM_NAME,
        subject: subject,
        template: template,
        context: data,
      })
      .then((success) => {
        console.log(success)
      })
      .catch((err) => {
        console.log(err)
      });
  }
}
