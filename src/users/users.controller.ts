import { Controller, Get, Post, Body, Put, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        try {
            return await this.usersService.create(createUserDto);
        } catch (error) {
            throw new HttpException('Could not create user', HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        const user = await this.usersService.findOne(Number(id));
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateData: Partial<User>): Promise<User> {
        const user = await this.usersService.update(Number(id), updateData);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        const deleted = await this.usersService.remove(Number(id));
        if (!deleted) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }
}
