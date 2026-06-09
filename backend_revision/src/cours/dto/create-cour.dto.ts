import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateCourDto {
  @IsString()
  @IsNotEmpty()
  titre: string;

  @IsString()
  @IsNotEmpty()
  contenu: string;

  @IsUUID()
  @IsNotEmpty()
  matiere_id: string;

  @IsOptional()
  @IsString()
  image_url?: string;
}
