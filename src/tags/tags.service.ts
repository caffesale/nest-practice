import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { In, Repository } from 'typeorm';
import { CreateTagDTO } from './dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async createTag(createTagDTO: CreateTagDTO) {
    const tag = this.tagRepository.create(createTagDTO);
    return await this.tagRepository.save(tag);
  }

  public async findMultipleTags(tags: number[]) {
    const result = await this.tagRepository.find({
      where: {
        id: In(tags),
      },
    });
    return result;
  }

  public async delete(id: number) {
    await this.tagRepository.delete(id);

    return {
      delete: true,
      id,
    };
  }
}
