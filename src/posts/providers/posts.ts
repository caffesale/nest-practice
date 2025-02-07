import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDTO } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    public readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async create(@Body() createPostDTO: CreatePostDTO) {
    const posts = this.postsRepository.create(createPostDTO);
    return await this.postsRepository.save(posts);
  }

  public async findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    // Users Service
    const posts = await this.postsRepository.find({});
    // Find A User
    // Return A User
    return posts;
  }

  public async delete(id: number) {
    // Find the post
    let inversePost = await this.metaOptionsRepository.find({
      where: { id: post?.metaOptions?.id },
      relations: {
        post: true,
      },
    });
    // confirmation
    return { deleted: true, id };
  }
}
