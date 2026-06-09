import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/users/entities/user.entity';

export class CreateAuthDto {
  @IsNotEmpty()
  nom: string;

  @IsOptional()
  prenom: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  mot_de_pass: string;

  @IsOptional()
  @IsEnum(UserRole, {
    message: 'le role soit eleve , parent , admin ou professeur',
  })
  role?: UserRole;
}
