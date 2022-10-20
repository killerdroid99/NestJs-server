import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async create(createPostDto: CreatePostDto, userId: string) {
    return await this.db.post.create({
      data: { ...createPostDto, userId },
    });
  }

  findAll(sortBy: any) {
    return this.db.post.findMany({
      orderBy: {
        createdAt: sortBy || 'desc',
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.db.post.findUnique({
      where: { id },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto, userId: string) {
    const post = await this.db.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new HttpException('post not found', HttpStatus.NOT_FOUND);
    }

    if (post.userId !== userId) {
      throw new HttpException(
        'user not authorized to perform this action',
        HttpStatus.FORBIDDEN,
      );
    }

    return await this.db.post.update({
      where: {
        id_userId: {
          id,
          userId,
        },
      },
      data: updatePostDto,
    });
  }

  async remove(id: string, userId: string) {
    const post = await this.db.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new HttpException('post not found', HttpStatus.NOT_FOUND);
    }

    if (post.userId !== userId) {
      throw new HttpException(
        'user not authorized to perform this action',
        HttpStatus.FORBIDDEN,
      );
    }

    return await this.db.post.delete({
      where: {
        id_userId: {
          id,
          userId,
        },
      },
    });
  }
}
