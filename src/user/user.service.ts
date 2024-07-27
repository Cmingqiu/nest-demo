import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    const data = await this.userModel.create(createUserDto);
    return { code: 0, data };
  }

  async findAll(params: UpdateUserDto) {
    const allUsers = await this.userModel.find(params);
    return { code: 0, data: allUsers };
  }

  async findOne(id: number) {
    const user = await this.userModel.findById(id);
    return { code: 0, data: user };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const data = await this.userModel.findByIdAndUpdate(id, updateUserDto);
      return { code: 0, data };
    } catch (error) {}
  }

  async remove(id: string) {
    try {
      const data = await this.userModel.findByIdAndDelete(id);
      return { code: 0, data };
    } catch (error) {}
  }
}
