import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole, UserStatus } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepo.findOne({ where: { email } });
  }

  async create(dto: CreateUserDto) {
    const hashed = await bcrypt.hash(dto.mot_de_pass, 10);
    const user = this.userRepo.create({
      email: dto.email,
      nom: dto.nom,
      prenom: dto.prenom,
      mot_de_pass: hashed,
      role: (dto.role as UserRole) || UserRole.ELEVE,
      status: (dto.status as UserStatus) || UserStatus.ACTIVE,
    });
    return await this.userRepo.save(user);
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    await this.userRepo.update(id, updateUserDto as any);
    return await this.userRepo.findOneBy({ id });
  }

  async remove(id: string) {
    await this.userRepo.delete(id);
    return { message: 'Suppression réussie' };
  }
}
