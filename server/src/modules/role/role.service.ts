import { Injectable } from '@nestjs/common';
import { Role } from './role.model';

@Injectable()
export class RoleService {
  private readonly roles: Role[] = [
    { id: 1, name: 'Role 1' },
    { id: 2, name: 'Role 2' },
  ];

  list(): Role[] {
    return this.roles;
  }

  detail(id: number): Role {
    const role = this.roles.find(({ id: item_id }) => item_id === id);
    if (!role) throw new Error('Role not found!');
    return role;
  }

  create(role: Role): Role {
    this.roles.push(role);
    return role;
  }
}
