import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateCourDto {
    @IsString()
    @IsNotEmpty()
    nom : string

    @IsString()
    @IsNotEmpty()
    contenu : string

    @IsUUID()
    @IsNotEmpty()
    matiere_id : string
}
