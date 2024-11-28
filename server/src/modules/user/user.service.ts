import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 1,
      role_id: 1,
      name: 'User 1',
      email: 'email_1@example.com',
      avatar: 'avatar_url_1',
    },
    {
      id: 2,
      role_id: 2,
      name: 'User 2',
      email: 'email_2@example.com',
      avatar: 'avatar_url_2',
    },
  ];

  list(): User[] {
    return this.users;
  }

  listByRoleId(role_id: number): User[] {
    return this.users.filter(
      ({ role_id: item_role_id }) => (item_role_id = role_id),
    );
  }

  detail(id: number): User {
    const user = this.users.find(({ id: item_id }) => item_id === id);
    if (!user) throw new Error('User not found!');
    return user;
  }

  create(user: User): User {
    this.users.push(user);
    return user;
  }
}
