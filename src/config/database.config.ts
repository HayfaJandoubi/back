import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Manager } from '../managers/entities/manager.entity';
import { Technician } from '../technicians/entities/technician.entity';
import { SiteMobile } from '../sites/entities/site.entity';
import { Person } from '../persons/entities/person.entity';

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'telecom',
    entities: [User, Manager, Technician, SiteMobile, Person],
    synchronize: true, // Ne pas utiliser en production
    logging: true,
}; 