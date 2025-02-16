import {
  BadRequestException,
  Body,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDTO } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { Tag } from 'src/tags/tag.entity';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { ActiveUserData } from 'src/auth/interfaces/active-user.interface';
import { CreatePostProvider } from './create-post.provider';
@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    public readonly metaOptionsRepository: Repository<MetaOption>,

    public readonly tagsService: TagsService,
    public readonly paginationProvider: PaginationProvider,
    public readonly createPostProvider: CreatePostProvider,
  ) {}

  public async create(createPostDTO: CreatePostDTO, user: ActiveUserData) {
    return await this.createPostProvider.create(createPostDTO, user);
  }

  public async findAll(
    postQuery: GetPostsDto,
    userId: string,
  ): Promise<Paginated<Post>> {
    const posts = await this.paginationProvider.paginatedQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.postsRepository,
    );
    return posts;
  }

  public async delete(id: number) {
    await this.postsRepository.delete(id);
    return { deleted: true, id };
  }

  public async update(patchPostDto: PatchPostDto) {
    let tags: Tag[] | null = null;
    let posts: Post | null = null;
    // find the Tags
    try {
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try again later',
      );
    }

    if (!tags || tags.length !== (patchPostDto?.tags.length ?? [])) {
      throw new BadRequestException(
        'Please check your tag Ids and ensure they are correct',
      );
    }

    // find the post
    try {
      posts = await this.postsRepository.findOneBy({
        id: patchPostDto.id,
      });
    } catch (error) {
      throw new RequestTimeoutException('Post not found');
    }

    if (!posts) {
      throw new BadRequestException('The post ID does not exist');
    }
    // update the properties
    posts.title = patchPostDto.title ?? posts.title;
    posts.content = patchPostDto.content ?? posts.content;
    posts.status = patchPostDto.status ?? posts.status;
    posts.postType = patchPostDto.postType ?? posts.postType;
    posts.slug = patchPostDto.slug ?? posts.slug;
    posts.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? posts.featuredImageUrl;
    posts.publishOn = patchPostDto.publishOn ?? posts.publishOn;
    // assign the new tags
    posts.tags = tags;
    // save the post and return
    return await this.postsRepository.save(posts);
  }
}
