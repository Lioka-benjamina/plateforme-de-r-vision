export class CreateUserDto {
  email: string;
  mot_de_pass: string;
  nom: string;
  prenom: string;
  role?: string;
  status?: string;
}
