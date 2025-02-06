import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { Tag } from './tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TagsController],
  exports: [Tag],
  imports: [TypeOrmModule.forFeature([Tag])],
})
export class TagsModule {}
