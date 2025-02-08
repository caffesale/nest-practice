import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { Tag } from './tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsService } from './tags.service';

@Module({
  controllers: [TagsController],
  exports: [Tag],
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagsService],
})
export class TagsModule {}
