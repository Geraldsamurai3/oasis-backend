// src/inscriptions/notifications.service.ts

import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';

import { MailerService } from '../mailer/mailer.service';
import { InscriptionsService } from './inscriptions.service';

@Injectable()
export class NotificationsService {
  private readonly frontendUrl: string;

  constructor(
    private readonly mailer: MailerService,
    private readonly inscSvc: InscriptionsService,
    private readonly config: ConfigService,
  ) {
    this.frontendUrl = this.config.get<string>('FRONTEND_URL') || '';
  }

  @OnEvent('mission.created')
  async onMissionCreated(mission: {
    id: number;
    title: string;
    description: string;
    location: string;
    date?: string;
  }) {
    const subscribers = await this.inscSvc.findSubscribers('wantsMissions');
    const url = `${this.frontendUrl}/missions/${mission.id}`;
    for (const sub of subscribers) {
      await this.mailer.sendMissionCreated(sub.email, {
        ...mission,
        url,
      });
    }
  }

  @OnEvent('project.created')
  async onProjectCreated(project: {
    id: number;
    title: string;
    description: string;
    location: string;
  }) {
    const subscribers = await this.inscSvc.findSubscribers('wantsProjects');
    const url = `${this.frontendUrl}/projects/${project.id}`;
    for (const sub of subscribers) {
      await this.mailer.sendProjectCreated(sub.email, {
        ...project,
        url,
      });
    }
  }

  @OnEvent('event.created')
  async onEventCreated(event: {
    id: number;
    title: string;
    description: string;
    location: string;
    date?: string;
  }) {
    const subscribers = await this.inscSvc.findSubscribers('wantsEvents');
    const url = `${this.frontendUrl}/events/${event.id}`;
    for (const sub of subscribers) {
      await this.mailer.sendEventCreated(sub.email, {
        ...event,
        url,
      });
    }
  }
}
