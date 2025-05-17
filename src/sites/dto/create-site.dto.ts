import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateSiteDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Z0-9]+$/, {
        message: 'Le numéro du site doit contenir uniquement des lettres majuscules et des chiffres'
    })
    numero: string;

    @IsString()
    @IsNotEmpty()
    adresse: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/, {
        message: 'Les coordonnées doivent être au format latitude,longitude'
    })
    coordonnees: string;

    @IsString()
    @IsNotEmpty()
    equipement: string;

    @IsString()
    @IsNotEmpty()
    technologie: string;

    @IsString()
    @IsNotEmpty()
    type: string;
} 