import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technician } from './entities/technician.entity';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { ManagersService } from '../managers/managers.service';

@Injectable()
export class TechniciansService {
    constructor(
        @InjectRepository(Technician)
        private techniciansRepository: Repository<Technician>,
        private managersService: ManagersService
    ) {}

    async create(createTechnicianDto: CreateTechnicianDto): Promise<Technician> {
        const manager = await this.managersService.findOne(createTechnicianDto.managerId);
        
        const technician = this.techniciansRepository.create({
            ...createTechnicianDto,
            manager
        });
        
        return await this.techniciansRepository.save(technician);
    }

    async findAll(): Promise<Technician[]> {
        return await this.techniciansRepository.find({
            relations: ['manager']
        });
    }

    async findOne(id: string): Promise<Technician> {
        const technician = await this.techniciansRepository.findOne({
            where: { id },
            relations: ['manager']
        });
        
        if (!technician) {
            throw new NotFoundException(`Technician with ID ${id} not found`);
        }
        
        return technician;
    }

    async findByManager(managerId: number): Promise<Technician[]> {
        return await this.techniciansRepository.find({
            where: {
                manager: { id: managerId }
            },
            relations: ['manager']
        });
    }

    async update(id: string, updateData: Partial<Technician>): Promise<Technician> {
        await this.techniciansRepository.update(id, updateData);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const result = await this.techniciansRepository.delete(id);
        if (!result.affected) {
            throw new NotFoundException(`Technician with ID ${id} not found`);
        }
    }
} 