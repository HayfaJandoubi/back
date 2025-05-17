import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Manager } from '../../managers/entities/manager.entity';

@Entity('technicians')
export class Technician {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fullName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    phone: string;

    @Column()
    region: string;

    @Column()
    password: string;

    @ManyToOne(() => Manager, manager => manager.technicians)
    manager: Manager;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 