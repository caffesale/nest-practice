import { Body, Controller, Post } from '@nestjs/common';
import { CreateTagDTO } from './dtos/create-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Post()
  public createTags(@Body() createTagDTO: CreateTagDTO) {
    return this.tagService.createTag(createTagDTO);
  }
}
