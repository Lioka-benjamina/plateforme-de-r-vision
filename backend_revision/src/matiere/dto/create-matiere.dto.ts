import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Niveau } from "../entities/matiere.entity";

export class CreateMatiereDto {
    @IsString()
    @IsNotEmpty()
    nom : string

    @IsEnum(Niveau , {message : "le niveau soit CEPE , BEPC , ou BACC"})
    niveau : Niveau
}
