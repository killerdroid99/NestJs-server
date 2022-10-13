import { MinLength } from 'class-validator';

export class CreatePostDto {
  @MinLength(5)
  title: string;

  content?: string;
}
