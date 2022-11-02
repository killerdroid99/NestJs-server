import { MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @MinLength(5)
  @MaxLength(50)
  title: string;

  content?: string;
}
