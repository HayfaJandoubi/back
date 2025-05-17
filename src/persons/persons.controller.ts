import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Controller('persons')
export class PersonsController {
    constructor(private readonly personsService: PersonsService) {}

    @Post()
    async create(@Body() createPersonDto: CreatePersonDto): Promise<Person> {
        return await this.personsService.create(createPersonDto);
    }

    @Get()
    async findAll(@Query('search') search?: string): Promise<Person[]> {
        return await this.personsService.findAll(search);
    }

    @Get('role/:role')
    async findByRole(@Param('role') role: string): Promise<Person[]> {
        return await this.personsService.findByRole(role);
    }

    @Get('email/:email')
    async findByEmail(@Param('email') email: string): Promise<Person> {
        return await this.personsService.findByEmail(email);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Person> {
        return await this.personsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePersonDto: UpdatePersonDto
    ): Promise<Person> {
        return await this.personsService.update(id, updatePersonDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.personsService.remove(id);
    }
} 