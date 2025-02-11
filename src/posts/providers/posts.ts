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
        tags: true,
      },
    });
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
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;
    // assign the new tags
    post.tags = tags;
    // save the post and return
    return await this.postsRepository.save(post);
  }
}
