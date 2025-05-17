import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechniciansService } from './technicians.service';
import { TechniciansController } from './technicians.controller';
import { Technician } from './entities/technician.entity';
import { ManagersModule } from '../managers/managers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Technician]),
    ManagersModule
  ],
  controllers: [TechniciansController],
  providers: [TechniciansService],
  exports: [TechniciansService]
})
export class TechniciansModule {}
