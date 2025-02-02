import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
