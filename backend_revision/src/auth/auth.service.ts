import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt'
import { User, UserRole, UserStatus } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }


  async register(AuthDto: CreateAuthDto): Promise<{ message: string }> {
    const existing = await this.usersService.findByEmail(AuthDto.email)
    if (existing) {
      throw new BadRequestException("email déjà utiliser")
    }

    const hashed = await bcrypt.hash(AuthDto.mot_de_pass, 10)

    let role = AuthDto.role || UserRole.ELEVE
    let status = UserStatus.ACTIVE

    if (role === UserRole.ADMIN) {
      role = UserRole.ELEVE
    }

    if (role === UserRole.PROF) {
      status = UserStatus.PENDING
    }

    const user: Partial<User> = {
      nom: AuthDto.nom,
      prenom: AuthDto.prenom,
      email: AuthDto.email,
      mot_de_pass: hashed,
      role,
      status
    }

    await this.usersService.create(user)
    return { message: "Inscription réussi" };
  }

  async login(email: string, mot_de_pass: string): Promise<{ token: string }> {
    const user = await this.usersService.findByEmail(email)
    if (!user) {
      throw new BadRequestException("email incorrect")
    }

    // console.log('mot_de_pass reçu :', mot_de_pass)
    // console.log('mot_de_pass utilisateur:', user.mot_de_pass)

    const passwordMatch = await bcrypt.compare(mot_de_pass, user.mot_de_pass)
    if (!passwordMatch) throw new BadRequestException('Mot de passe incorrect');

    const paylod = { sub: user.id, email: user.email , role : user.role}

    const token = await this.jwtService.signAsync(paylod)
    return { token }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
