// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { TypeOrmModule }              from '@nestjs/typeorm';
import { MailerModule }               from '@nestjs-modules/mailer';
import { EventEmitterModule }         from '@nestjs/event-emitter';
import { APP_GUARD }                  from '@nestjs/core';

import { AppController }    from './app.controller';
import { AppService }       from './app.service';

import { JwtAuthGuard }     from './auth/guards/jwt-auth.guard';
import { BlockedGuard }     from './auth/guards/blocked.guard';

import { EventsModule }      from './events/events.module';
import { MissionsModule }    from './missions/missions.module';
import { ProjectsModule }    from './projects/projects.module';
import { AuthModule }        from './auth/auth.module';
import { InscriptionsModule }from './inscriptions/inscriptions.module';
import { ContactsModule }    from './contacts/contacts.module';
import { GalleryModule }     from './gallery/gallery.module';
import { SharedModule }      from './shared/shared.module';
import { CategoriesModule }  from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cs: ConfigService) => ({
        type:       'mariadb',
        host:       cs.get('DB_HOST'),
        port:       cs.get<number>('DB_PORT'),
        username:   cs.get('DB_USERNAME'),
        password:   cs.get('DB_PASSWORD'),
        database:   cs.get('DB_DATABASE'),
        entities:   [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize:true,
      }),
      inject: [ConfigService],
    }),

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cs: ConfigService) => ({
        transport: {
          host: cs.get('MAIL_HOST'),
          port: cs.get<number>('MAIL_PORT'),
          auth: {
            user: cs.get('MAIL_USER'),
            pass: cs.get('MAIL_PASS'),
          },
        },
        defaults: { from: cs.get('MAIL_FROM') },
      }),
      inject: [ConfigService],
    }),

    EventEmitterModule.forRoot(),

    EventsModule,
    MissionsModule,
    ProjectsModule,
    AuthModule,
    InscriptionsModule,
    ContactsModule,
    GalleryModule,
    SharedModule,
    CategoriesModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Aplicar guards globalmente
    { provide: APP_GUARD, useClass: BlockedGuard },
  ],
})
export class AppModule {}
