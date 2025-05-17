import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('sites')
export class SiteMobile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    numero: string;

    @Column()
    adresse: string;

    @Column()
    coordonnees: string;

    @Column()
    equipement: string;

    @Column()
    technologie: string;

    @Column()
    type: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 