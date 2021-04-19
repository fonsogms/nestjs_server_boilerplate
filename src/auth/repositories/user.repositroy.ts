import { EntityRepository, Repository } from 'typeorm';
import { RegisterDto } from '../dto/register.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Interface } from 'readline';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(registerDto: RegisterDto) {
    const { username, password } = registerDto;
    const user = new User();
    user.username = username;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    try {
      const createdUser = await user.save();
      return {
        username: createdUser.username,
        id: createdUser.id,
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
  async validateUserPassword(registerDto: RegisterDto): Promise<User | null> {
    const { username, password } = registerDto;
    const user = await this.findOne({ username });
    if (!user) {
      const error = new UnauthorizedException('Wrong credentials');
      throw error;
    }
    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}
