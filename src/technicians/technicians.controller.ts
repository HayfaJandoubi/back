import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TechniciansService } from './technicians.service';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { Technician } from './entities/technician.entity';

@Controller('technicians')
export class TechniciansController {
    constructor(private readonly techniciansService: TechniciansService) {}

    @Post()
    async create(@Body() createTechnicianDto: CreateTechnicianDto): Promise<Technician> {
        return await this.techniciansService.create(createTechnicianDto);
    }

    @Get()
    async findAll(): Promise<Technician[]> {
        return await this.techniciansService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Technician> {
        return await this.techniciansService.findOne(id);
    }

    @Get('manager/:managerId')
    async findByManager(
        @Param('managerId', ParseIntPipe) managerId: number
    ): Promise<Technician[]> {
        return await this.techniciansService.findByManager(managerId);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateData: Partial<Technician>
    ): Promise<Technician> {
        return await this.techniciansService.update(id, updateData);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.techniciansService.remove(id);
    }
} 