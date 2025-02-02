import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [UsersModule],
})
export class PostsModule {}
