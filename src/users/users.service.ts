import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        const newUser = this.usersRepository.create(user);
        return await this.usersRepository.save(newUser);
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findOne(id: number): Promise<User | null> {
        return await this.usersRepository.findOneBy({ id });
    }

    async update(id: number, updateData: Partial<User>): Promise<User | null> {
        await this.usersRepository.update(id, updateData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<boolean> {
        const result = await this.usersRepository.delete(id);
        return Boolean(result.affected);
    }
}
