import { IsNotEmpty, IsString, IsUUID, IsOptional, IsArray } from "class-validator";

export class CreateQuizDto {
    @IsString()
    @IsNotEmpty()
    titre: string

    @IsUUID()
    @IsNotEmpty()
    cours_id: string

    @IsOptional()
    @IsArray()
    questions?: {
        id: string
        texte: string
        options: { id: string; texte: string; correct?: boolean }[]
    }[]
}
