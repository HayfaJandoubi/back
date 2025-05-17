import { IsString, IsEmail, IsNotEmpty, Matches, IsOptional, IsBoolean } from 'class-validator';

export class UpdatePersonDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    nom?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    prenom?: string;

    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    email?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    siege?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Matches(/^[0-9+\-\s()]*$/, {
        message: 'Le numéro de téléphone n\'est pas valide'
    })
    telephone?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    role?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
} 