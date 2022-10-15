import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UseGuards,
  Session,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { CreatePostDto } from './dtos/CreatePostDto';
import { UpdatePostDto } from './dtos/UpdatePostDto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  @UsePipes(new ValidationPipe())
  create(
    @Body() createPostDto: CreatePostDto,
    @Session() session: Record<string, any>,
  ) {
    return this.postsService.create(createPostDto, session.passport.user.id);
  }

  @Get()
  findAll(@Query('sortBy') sortBy: string) {
    return this.postsService.findAll(sortBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const post = this.postsService.findOne(id);

    if (!post) {
      throw new HttpException(
        `Post with id: ${id} is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return post;
  }

  @Patch(':id')
  @UseGuards(AuthenticatedGuard)
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
