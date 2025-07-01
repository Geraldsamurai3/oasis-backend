// src/auth/guards/jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard }                   from '@nestjs/passport';
import { Reflector }                   from '@nestjs/core';
import { IS_PUBLIC_KEY }               from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // 1) ¿esta ruta está marcada como pública?
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // no valida JWT en rutas públicas
      return true;
    }
    // 2) si no, ejecuta la validación normal de JWT
    return super.canActivate(context);
  }
}
