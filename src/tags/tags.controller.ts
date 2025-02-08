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
  public async delete(@Query('id', ParseIntPipe) id: number) {
    return this.tagService.delete(id);
  }

  @Delete('soft-delete')
  public async softDelete(@Query('id', ParseIntPipe) id: number) {
    return this.tagService.softRemove(id);
  }
}
