import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreatePostDTO } from './dtos/create-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get('/:userId')
  public getPosts(@Param('userId') userId: string) {
    return this.postService.findAll(userId);
  }

  @Post()
  @ApiBody({
    type: CreatePostDTO,
  })
  public createPosts(@Body() createPostDto: CreatePostDTO) {
    return this.postService.create(createPostDto);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}
