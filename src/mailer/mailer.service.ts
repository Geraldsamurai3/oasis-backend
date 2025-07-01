import { Injectable } from '@nestjs/common';
import { MailerService as NestMailer } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly mailer: NestMailer) {}

  sendMissionCreated(to: string, ctx: {
    title: string;
    description: string;
    location: string;
    date?: string;
    url: string;
  }) {
    return this.mailer.sendMail({
      to,
      subject: `Nueva misión: ${ctx.title}`,
      template: 'mission_created',
      context: ctx,
    });
  }

  sendProjectCreated(to: string, ctx: {
    title: string;
    description: string;
    location: string;
    url: string;
  }) {
    return this.mailer.sendMail({
      to,
      subject: `Nuevo proyecto: ${ctx.title}`,
      template: 'project_created',
      context: ctx,
    });
  }

  sendEventCreated(to: string, ctx: {
    title: string;
    description: string;
    location: string;
    date?: string;
    url: string;
  }) {
    return this.mailer.sendMail({
      to,
      subject: `Nuevo evento: ${ctx.title}`,
      template: 'event_created',
      context: ctx,
    });
  }
}
