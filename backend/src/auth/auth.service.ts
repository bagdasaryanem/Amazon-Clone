import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const user = await this.userRepository.createUser(authCredentialsDto);
    const payload = {
      uid: user.id,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }

  async signIn({
    email,
    password,
  }: AuthCredentialsDto): Promise<JwtPayloadDto> {
    const user = await this.userRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        uid: user.id,
      };
      const accessToken = this.jwtService.sign(payload);

      return {
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
