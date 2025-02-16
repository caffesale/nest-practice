import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreatePostDTO } from '../dtos/create-post.dto';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/tags.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user.interface';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tag.entity';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    public readonly tagsService: TagsService,
  ) {}

  public async create(createPostDTO: CreatePostDTO, user: ActiveUserData) {
    // Find author from databse based on authorId
    let author: User | null = null;
    let tags: Tag[] | null = null;
    try {
      author = await this.usersService.findOneById(user.sub);

      tags = await this.tagsService.findMultipleTags(createPostDTO.tags || []);
    } catch (err) {
      throw new ConflictException(err);
    }

    if (createPostDTO?.tags?.length !== tags.length) {
      throw new BadRequestException('Please provide valid tags');
    }

    const posts = this.postsRepository.create({
      ...createPostDTO,
      author: author!,
      tags,
    });

    try {
      return await this.postsRepository.save(posts);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
