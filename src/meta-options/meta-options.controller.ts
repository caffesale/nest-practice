import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostMetaOptionsDTO } from './dto/create-post-metaoptions.dto';
import { MetaOptionsService } from './providers/meta-options.service';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}
  @Post()
  public create(@Body() createPostMetaOptionsDTO: CreatePostMetaOptionsDTO) {
    return this.metaOptionsService.create(createPostMetaOptionsDTO);
  }
}
