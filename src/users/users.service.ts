import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity ';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { UsersRepository } from './repositories/user.repository';
import { Role } from './entities/role.entity';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(UsersRepository)
    private readonly userRepository: UsersRepository,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async changeUserRole(userId: number, roleDto: RoleDto): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('The user does not exist');
    }
    const role = await this.roleRepository.findOne({ title: roleDto.title });
    if (!role) {
      throw new NotFoundException('The role does not exist');
    }
    user.role = role;
    return this.userRepository.save(user);
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('The user does not exist');
    }
    user.isActive = false;
    await this.userRepository.save(user);
  }

  async getUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('The user does not exist');
    }
    return user;
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
