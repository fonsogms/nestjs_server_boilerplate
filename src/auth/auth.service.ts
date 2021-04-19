import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './authResponse.interface';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repositroy';
import { JwtPayload } from './userPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const user = await this.userRepo.register(registerDto);
    const payload: JwtPayload = {
      username: user.username,
      id: user.id,
    };

    const token = this.jwtService.sign(payload);
    if (token) {
      return { token };
    }
    return { token: '' };
  }
  async login(loginDto: RegisterDto): Promise<AuthResponse> {
    const user = await this.userRepo.validateUserPassword(loginDto);
    const payload: JwtPayload = {
      username: user.username,
      id: user.id,
    };
    const token = this.jwtService.sign(payload);

    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    } else {
      return { token };
    }
  }
  async loggedIn(token): Promise<AuthResponse> {
    if (!token) {
      throw new UnauthorizedException('Please log in');
    }

    let payload: JwtPayload | null = null;
    try {
      payload = await this.jwtService.verify(token);
    } catch (err) {
      if (err.message === 'jwt expired') {
        return { token: '' };
      }
      throw err;
    }
    const { username, id } = payload;

    const user: User = await this.userRepo.findOne({
      username: username,
      id,
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    token = this.jwtService.sign({
      username: user.username,
      id: user.id,
    });
    return { token };
  }
}
