import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { Tag } from './tag.entity';

@Module({
  controllers: [TagsController],
  exports: [Tag],
})
export class TagsModule {}
