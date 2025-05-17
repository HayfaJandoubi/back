import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Technician } from '../../technicians/entities/technician.entity';

@Entity('managers')
export class Manager {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column({ unique: true })
    email: string;

    @Column()
    siege: string;

    @Column()
    telephone: string;

    @Column()
    role: string;

    @Column({
        type: 'enum',
        enum: ['active', 'inactive', 'on-leave'],
        default: 'active'
    })
    status: 'active' | 'inactive' | 'on-leave';

    @OneToMany(() => Technician, technician => technician.manager)
    technicians: Technician[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 