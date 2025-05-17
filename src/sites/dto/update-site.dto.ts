import { IsString, IsNotEmpty, Matches, IsOptional, IsBoolean } from 'class-validator';

export class UpdateSiteDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Z0-9]+$/, {
        message: 'Le numéro du site doit contenir uniquement des lettres majuscules et des chiffres'
    })
    numero?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    adresse?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Matches(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/, {
        message: 'Les coordonnées doivent être au format latitude,longitude'
    })
    coordonnees?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    equipement?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    technologie?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    type?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
} 