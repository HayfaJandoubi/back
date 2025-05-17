import { IsString, IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreatePersonDto {
    @IsString()
    @IsNotEmpty()
    nom: string;

    @IsString()
    @IsNotEmpty()
    prenom: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    siege: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[0-9+\-\s()]*$/, {
        message: 'Le numéro de téléphone n\'est pas valide'
    })
    telephone: string;

    @IsString()
    @IsNotEmpty()
    role: string;
} 