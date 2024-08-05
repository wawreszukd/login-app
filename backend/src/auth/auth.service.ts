import { Body, HttpException, Injectable } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  findUser(username: string) {
    return this.repo.findOne({ where: { username } });
  }
  async register(body: AuthDto) {
    const hashedPassword = await bcrypt.hash(body.password, 12);
    console.log('pass', hashedPassword);
    const user = this.repo.create({
      username: body.username,
      password: hashedPassword,
    });
    return this.repo.save(user);
  }
  async login(@Body() body: AuthDto) {
    const user = await this.findUser(body.username);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const isValid = await bcrypt.compare(body.password, user.password);
    console.log(isValid);
    if (!isValid) {
      throw new HttpException('Invalid credentials', 401);
    }
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }
  async validate(token: string) {
    try {
      const { id } = this.jwtService.verify(token);
      return this.findUser(id);
    } catch (e) {
      throw new HttpException('Invalid token', 401);
    }
  }
}
