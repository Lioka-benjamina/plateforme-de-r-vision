import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateCourDto {
    @IsString()
    @IsNotEmpty()
    titre: string

    @IsString()
    @IsNotEmpty()
    contenu: string

    @IsUUID()
    @IsNotEmpty()
    matiere_id: string

    auteur: User

    valide: boolean
}
