import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager } from './entities/manager.entity';

@Controller('managers')
export class ManagersController {
    constructor(private readonly managersService: ManagersService) {}

    @Post()
    async create(@Body() createManagerDto: CreateManagerDto): Promise<Manager> {
        return await this.managersService.create(createManagerDto);
    }

    @Get()
    async findAll(): Promise<Manager[]> {
        return await this.managersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Manager> {
        return await this.managersService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateManagerDto: UpdateManagerDto
    ): Promise<Manager> {
        return await this.managersService.update(id, updateManagerDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.managersService.remove(id);
    }
} 