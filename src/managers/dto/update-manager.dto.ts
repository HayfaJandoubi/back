import { IsString, IsEmail, IsEnum, IsOptional, Matches } from 'class-validator';

export class UpdateManagerDto {
    @IsOptional()
    @IsString()
    nom?: string;

    @IsOptional()
    @IsString()
    prenom?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    siege?: string;

    @IsOptional()
    @IsString()
    @Matches(/^[0-9+\-\s()]*$/, {
        message: 'Le numéro de téléphone n\'est pas valide'
    })
    telephone?: string;

    @IsOptional()
    @IsString()
    role?: string;

    @IsOptional()
    @IsEnum(['active', 'inactive', 'on-leave'], {
        message: 'Le statut doit être soit active, inactive ou on-leave'
    })
    status?: 'active' | 'inactive' | 'on-leave';
} 