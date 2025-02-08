import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDTO } from './create-post.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class PatchPostDto extends PartialType(CreatePostDTO) {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
