import { PassportSerializer } from '@nestjs/passport';
import { PrismaClient, User } from '@prisma/client';

// using PrismaClient() as PrismaService is not working
const db = new PrismaClient();

interface DeserializedUser {
  id: string;
  username: string;
}

export class SessionSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(
    user: User,
    done: (err, user: DeserializedUser) => void,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userDB } = await db.user.findUnique({
      where: { id: user.id },
    });

    return userDB ? done(null, userDB) : done(null, null);
  }
}
