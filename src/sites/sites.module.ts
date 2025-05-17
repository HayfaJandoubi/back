import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SitesController } from './sites.controller';
import { SitesService } from './sites.service';
import { SiteMobile } from './entities/site.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SiteMobile])],
    controllers: [SitesController],
    providers: [SitesService],
    exports: [SitesService]
})
export class SitesModule {}
