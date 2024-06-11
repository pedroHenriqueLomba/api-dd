import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findToLogin(email: string) {
    return this.userModel
      .findOne({ email })
      .select({ _id: 1, email: 1, password: 1, name: 1})
      .lean();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
