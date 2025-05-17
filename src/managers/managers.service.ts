import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from './entities/manager.entity';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Injectable()
export class ManagersService {
    constructor(
        @InjectRepository(Manager)
        private managersRepository: Repository<Manager>,
    ) {}

    async create(createManagerDto: CreateManagerDto): Promise<Manager> {
        const manager = this.managersRepository.create(createManagerDto);
        return await this.managersRepository.save(manager);
    }

    async findAll(): Promise<Manager[]> {
        return await this.managersRepository.find({
            relations: ['technicians']
        });
    }

    async findOne(id: number): Promise<Manager> {
        const manager = await this.managersRepository.findOne({
            where: { id },
            relations: ['technicians']
        });
        
        if (!manager) {
            throw new NotFoundException(`Manager with ID ${id} not found`);
        }
        
        return manager;
    }

    async update(id: number, updateManagerDto: UpdateManagerDto): Promise<Manager> {
        const result = await this.managersRepository.update(id, updateManagerDto);
        
        if (result.affected === 0) {
            throw new NotFoundException(`Manager with ID ${id} not found`);
        }
        
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result = await this.managersRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Manager with ID ${id} not found`);
        }
    }
} 