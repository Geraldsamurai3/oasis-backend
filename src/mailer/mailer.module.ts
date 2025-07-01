import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailerService } from './mailer.service';

@Module({
  imports: [
    ConfigModule,
    NestMailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cs: ConfigService) => ({
        transport: {
          host: cs.get<string>('MAIL_HOST'),
          port: cs.get<number>('MAIL_PORT'),
          auth: {
            user: cs.get<string>('MAIL_USER'),
            pass: cs.get<string>('MAIL_PASS'),
          },
        },
        defaults: { from: cs.get<string>('MAIL_FROM') },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
