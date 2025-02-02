import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}

  findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    // Users Service
    // Find A User
    // Return A User
    return [
      { user, title: 'Test title', content: 'Test Content' },
      { user, title: 'Test title2', content: 'Test Content2' },
    ];
  }
}
