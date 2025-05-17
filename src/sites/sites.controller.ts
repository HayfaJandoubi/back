import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { SitesService } from './sites.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { SiteMobile } from './entities/site.entity';

@Controller('sites')
export class SitesController {
    constructor(private readonly sitesService: SitesService) {}

    @Post()
    async create(@Body() createSiteDto: CreateSiteDto): Promise<SiteMobile> {
        return await this.sitesService.create(createSiteDto);
    }

    @Get()
    async findAll(@Query('search') search?: string): Promise<SiteMobile[]> {
        if (search) {
            return await this.sitesService.search(search);
        }
        return await this.sitesService.findAll();
    }

    @Get('numero/:numero')
    async findByNumero(@Param('numero') numero: string): Promise<SiteMobile> {
        return await this.sitesService.findByNumero(numero);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<SiteMobile> {
        return await this.sitesService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSiteDto: UpdateSiteDto
    ): Promise<SiteMobile> {
        return await this.sitesService.update(id, updateSiteDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.sitesService.remove(id);
    }
} 