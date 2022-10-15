import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dtos/CreatePostDto';
import { UpdatePostDto } from './dtos/UpdatePostDto';

// export interface CreatePostDto {
//   title: string;
//   content?: string;
// }

// export interface UpdatePostDto {
//   title: string;
//   content?: string;
// }

@Injectable()
export class PostsService {
  constructor(private db: PrismaService) {}

  create(createPostDto: CreatePostDto, userId: string) {
    return this.db.post.create({
      data: { ...createPostDto, userId },
    });
  }

  findAll(sortBy: any) {
    return this.db.post.findMany({
      orderBy: {
        createdAt: sortBy || 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.db.post.findUnique({
      where: { id },
    });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.db.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  remove(id: string) {
    return this.db.post.delete({
      where: { id },
    });
  }
}
