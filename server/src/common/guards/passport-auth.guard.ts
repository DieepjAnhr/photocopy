import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { GUARD_ROLE } from '../decorators/auth-guard.decorator';
import { User } from 'src/modules/user/entity/user.entity';

@Injectable()
export class GraphqlPassportAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      GUARD_ROLE,
      context.getHandler(),
    );
    await super.canActivate(context);
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const user: User = req.user;

    const permissions = [];
    if (Array.isArray(user?.roles)) {
      user.roles.forEach((role) => {
        if (Array.isArray(role?.permissions)) {
          role.permissions.map((permission) => {
            permissions.push(permission.value);
          });
        }
      });
    }

    if (permissions.includes('FULL_ACCESS')) {
      return true;
    }

    return this.hasAccess(permissions, requiredPermissions);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    return req;
  }

  private hasAccess(
    permissions: string[],
    requiredPermissions: string[],
  ): boolean {
    if (requiredPermissions.length === 0) return true;

    const requirePermissionSet = new Set(requiredPermissions);

    return permissions.some((permission) =>
      requirePermissionSet.has(permission),
    );
  }
}
