// src/users/guards/block.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class BlockGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as User;  // ahora tu clase User
    if (user && user.isBlocked) {
      throw new ForbiddenException('Usuario bloqueado');
    }
    return true;
  }
}
