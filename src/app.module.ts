import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PostsModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
