import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonsService {
    constructor(
        @InjectRepository(Person)
        private personsRepository: Repository<Person>,
    ) {}

    async create(createPersonDto: CreatePersonDto): Promise<Person> {
        try {
            const person = this.personsRepository.create(createPersonDto);
            return await this.personsRepository.save(person);
        } catch (error) {
            if (error.code === '23505') { // Code PostgreSQL pour violation de contrainte unique
                throw new ConflictException(`Une personne avec l'email ${createPersonDto.email} existe déjà`);
            }
            throw error;
        }
    }

    async findAll(search?: string): Promise<Person[]> {
        if (search) {
            return await this.personsRepository.find({
                where: [
                    { nom: Like(`%${search}%`) },
                    { prenom: Like(`%${search}%`) },
                    { email: Like(`%${search}%`) },
                    { role: Like(`%${search}%`) }
                ]
            });
        }
        return await this.personsRepository.find();
    }

    async findOne(id: number): Promise<Person> {
        const person = await this.personsRepository.findOneBy({ id });
        
        if (!person) {
            throw new NotFoundException(`Personne avec l'ID ${id} non trouvée`);
        }
        
        return person;
    }

    async findByEmail(email: string): Promise<Person> {
        const person = await this.personsRepository.findOneBy({ email });
        
        if (!person) {
            throw new NotFoundException(`Personne avec l'email ${email} non trouvée`);
        }
        
        return person;
    }

    async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
        try {
            const result = await this.personsRepository.update(id, updatePersonDto);
            
            if (result.affected === 0) {
                throw new NotFoundException(`Personne avec l'ID ${id} non trouvée`);
            }
            
            return this.findOne(id);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException(`Une personne avec l'email ${updatePersonDto.email} existe déjà`);
            }
            throw error;
        }
    }

    async remove(id: number): Promise<void> {
        const result = await this.personsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Personne avec l'ID ${id} non trouvée`);
        }
    }

    async findByRole(role: string): Promise<Person[]> {
        return await this.personsRepository.find({
            where: { role }
        });
    }
} 