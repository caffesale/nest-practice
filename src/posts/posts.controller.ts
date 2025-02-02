import { Controller } from '@nestjs/common';
import { PostsService } from './providers/posts';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
}
