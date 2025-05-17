import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { databaseConfig } from './config/database.config';
import { ManagersModule } from './managers/managers.module';
import { TechniciansModule } from './technicians/technicians.module';
import { SitesModule } from './sites/sites.module';
import { PersonsModule } from './persons/persons.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    ManagersModule,
    TechniciansModule,
    SitesModule,
    PersonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
