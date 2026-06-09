import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateCourDto {
    @IsString()
    @IsNotEmpty()
    titre : string

    @IsString()
    @IsNotEmpty()
    contenu : string

    @IsUUID()
    @IsNotEmpty()
    matiere_id : string
}
