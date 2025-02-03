import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Permission } from 'src/modules/permission/entities/permission.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { GenericHash } from '../shared/types/app.type';

@Injectable()
export class GraphqlPassportAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    await super.canActivate(context);
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const permissions = ['full_access'];
    if (Array.isArray(req?.user?.roles)) {
      req.user.roles.forEach((role: Role) => {
        if (Array.isArray(role?.permissions)) {
          role.permissions.forEach((permission: Permission) => {
            permissions.push(permission.value);
          });
        }
      });
    }

    if (Array.isArray(permissions) && permissions.includes('full_access')) {
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
    const permissionMap: GenericHash<string> = permissions.reduce(
      (res, cur) => ((res[cur] = true), res),
      {},
    );
    for (const permission of requiredPermissions) {
      if (permissionMap[permission]) return true;
    }
    return false;
  }
}
