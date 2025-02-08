import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTagDTO } from './dtos/create-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Post()
  public createTags(@Body() createTagDTO: CreateTagDTO) {
    return this.tagService.createTag(createTagDTO);
  }

  @Delete()
  public deleteTag(@Query('id', ParseIntPipe) id: number) {
    return this.tagService.delete(id);
  }
}
