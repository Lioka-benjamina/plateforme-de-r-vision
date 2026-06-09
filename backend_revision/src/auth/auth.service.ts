import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { User, UserRole, UserStatus } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(AuthDto: CreateAuthDto): Promise<{ message: string }> {
    const existing = await this.usersService.findByEmail(AuthDto.email);
    if (existing) {
      throw new BadRequestException('email déjà utiliser');
    }

    const hashed = await bcrypt.hash(AuthDto.mot_de_pass, 10);

    let role = AuthDto.role || UserRole.ELEVE;
    let status = UserStatus.ACTIVE;

    if (role === UserRole.ADMIN) {
      role = UserRole.ELEVE;
    }

    if (role === UserRole.PROF) {
      status = UserStatus.PENDING;
    }

    const user: Partial<User> = {
      nom: AuthDto.nom,
      prenom: AuthDto.prenom,
      email: AuthDto.email,
      mot_de_pass: hashed,
      role,
      status,
    };

    await this.usersService.create(user);
    return { message: 'Inscription réussi' };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; user: Partial<User> }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('email incorrect');
    }

    const passwordMatch = await bcrypt.compare(password, user.mot_de_pass);
    if (!passwordMatch) throw new BadRequestException('Mot de passe incorrect');

    const payload = { sub: user.id, email: user.email, role: user.role };

    const access_token = await this.jwtService.signAsync(payload);
    const { mot_de_pass, ...userWithoutPassword } = user;
    return { access_token, user: userWithoutPassword };
  }

  async getProfile(userId: string): Promise<Partial<User>> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }
    const { mot_de_pass, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
