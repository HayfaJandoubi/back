import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteMobile } from './entities/site.entity';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SitesService {
    constructor(
        @InjectRepository(SiteMobile)
        private sitesRepository: Repository<SiteMobile>,
    ) {}

    async create(createSiteDto: CreateSiteDto): Promise<SiteMobile> {
        try {
            const site = this.sitesRepository.create(createSiteDto);
            return await this.sitesRepository.save(site);
        } catch (error) {
            if (error.code === '23505') { // Code PostgreSQL pour violation de contrainte unique
                throw new ConflictException(`Un site avec le numéro ${createSiteDto.numero} existe déjà`);
            }
            throw error;
        }
    }

    async findAll(): Promise<SiteMobile[]> {
        return await this.sitesRepository.find();
    }

    async findOne(id: number): Promise<SiteMobile> {
        const site = await this.sitesRepository.findOneBy({ id });
        
        if (!site) {
            throw new NotFoundException(`Site avec l'ID ${id} non trouvé`);
        }
        
        return site;
    }

    async findByNumero(numero: string): Promise<SiteMobile> {
        const site = await this.sitesRepository.findOneBy({ numero });
        
        if (!site) {
            throw new NotFoundException(`Site avec le numéro ${numero} non trouvé`);
        }
        
        return site;
    }

    async update(id: number, updateSiteDto: UpdateSiteDto): Promise<SiteMobile> {
        try {
            const result = await this.sitesRepository.update(id, updateSiteDto);
            
            if (result.affected === 0) {
                throw new NotFoundException(`Site avec l'ID ${id} non trouvé`);
            }
            
            return this.findOne(id);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException(`Un site avec le numéro ${updateSiteDto.numero} existe déjà`);
            }
            throw error;
        }
    }

    async remove(id: number): Promise<void> {
        const result = await this.sitesRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Site avec l'ID ${id} non trouvé`);
        }
    }

    async search(query: string): Promise<SiteMobile[]> {
        return await this.sitesRepository
            .createQueryBuilder('site')
            .where('site.numero ILIKE :query OR site.adresse ILIKE :query OR site.type ILIKE :query', {
                query: `%${query}%`
            })
            .getMany();
    }
} 