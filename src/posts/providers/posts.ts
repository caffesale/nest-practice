import { Body, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDTO } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/tags.service';
@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    public readonly metaOptionsRepository: Repository<MetaOption>,

    public readonly tagsService: TagsService,
  ) {}

  public async create(@Body() createPostDTO: CreatePostDTO) {
    // Find author from databse based on authorId
    const author = await this.usersService.findOneById(createPostDTO.authorId);

    const tags = await this.tagsService.findMultipleTags(
      createPostDTO.tags || [],
    );

    if (!author) {
      throw new Error('author not exist');
    }

    const posts = this.postsRepository.create({
      ...createPostDTO,
      author: author,
      tags,
    });
    return await this.postsRepository.save(posts);
  }

  public async findAll(userId: string) {
    const posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
        author: true,
      },
    });
    return posts;
  }

  public async delete(id: number) {
    await this.postsRepository.delete(id);
    return { deleted: true, id };
  }
}
