import { IsString, IsEmail, IsNotEmpty, MinLength, Matches, IsNumber } from 'class-validator';

export class CreateTechnicianDto {
    @IsString()
    @IsNotEmpty({ message: 'Le nom complet est requis' })
    @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
    fullName: string;

    @IsEmail({}, { message: 'Format d\'email invalide' })
    @IsNotEmpty({ message: 'L\'email est requis' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Le numéro de téléphone est requis' })
    @Matches(/^[0-9+\s-]+$/, { message: 'Format de numéro de téléphone invalide' })
    phone: string;

    @IsString()
    @IsNotEmpty({ message: 'La région est requise' })
    region: string;

    @IsString()
    @IsNotEmpty({ message: 'Le mot de passe est requis' })
    @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
        { message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre' }
    )
    password: string;

    @IsNumber()
    @IsNotEmpty({ message: 'L\'ID du manager est requis' })
    managerId: number;
} 