// src/auth/guards/blocked.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector }                   from '@nestjs/core';
import { IS_PUBLIC_KEY }               from '../decorators/public.decorator';

@Injectable()
export class BlockedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    // 1) Si la ruta es pública, no chequea bloqueo
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (isPublic) return true;

    // 2) De lo contrario, espera que req.user exista
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user) {
      // No hay usuario (p.ej. no pasó JwtAuthGuard), dejamos que JwtAuthGuard lance el 401
      return true;
    }

    // 3) Si está bloqueado, lanza 403
    if (user.isBlocked) {
      throw new ForbiddenException('Usuario bloqueado');
    }
    return true;
  }
}
