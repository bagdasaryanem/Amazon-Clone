import { UpdateUserDto } from './dto/updateUserDto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { User } from './user.entity';
import e from 'cors';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getAllUsers() {
    return this.userRepository.find();
  }

  getUser(id: number) {
    const user = this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return user;
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(updateUserDto.id);
    if (user) {
      return this.userRepository.update(updateUserDto.id, updateUserDto);
    }
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    } else {
      return this.userRepository.remove(user);
    }
  }
}
