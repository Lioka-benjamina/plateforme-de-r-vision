import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourDto } from './dto/create-cour.dto';
import { UpdateCourDto } from './dto/update-cour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cours } from './entities/cour.entity';
import { Repository } from 'typeorm';
import { Matiere } from 'src/matiere/entities/matiere.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CoursService {
  constructor(
    @InjectRepository(Cours)
    private coursRepo: Repository<Cours>,

    @InjectRepository(Matiere)
    private matiereRepo: Repository<Matiere>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(CourDto: CreateCourDto, auteurId: string) {
    const matiere = await this.matiereRepo.findOne({
      where: { id: CourDto.matiere_id },
    });
    if (!matiere) {
      throw new NotFoundException('Matière non trouvée');
    }
    const auteur = await this.userRepo.findOne({ where: { id: auteurId } });
    if (!auteur) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    const cours = this.coursRepo.create({
      titre: CourDto.titre,
      contenu: CourDto.contenu,
      matiere_id: CourDto.matiere_id,
      image_url: CourDto.image_url,
      status: 'en_attente',
      auteur,
    });
    return await this.coursRepo.save(cours);
  }

  async findAll(status?: string) {
    const where: any = {};
    if (status) where.status = status;
    return await this.coursRepo.find({ where, relations: ['matiere', 'auteur'] });
  }

  async findOne(id: string) {
    const cours = await this.coursRepo.findOne({
      where: { id },
      relations: ['matiere', 'auteur'],
    });
    if (!cours) {
      throw new NotFoundException('Cours non trouvé');
    }
    return cours;
  }

  async update(id: string, updateCourDto: UpdateCourDto) {
    const cours = await this.coursRepo.findOneBy({ id });
    if (!cours) {
      throw new NotFoundException('Cours non trouvé');
    }
    await this.coursRepo.update(id, updateCourDto as any);
    return await this.coursRepo.findOne({
      where: { id },
      relations: ['matiere', 'auteur'],
    });
  }

  async approve(id: string) {
    const cours = await this.coursRepo.findOneBy({ id });
    if (!cours) throw new NotFoundException('Cours non trouvé');
    cours.status = 'publié';
    cours.valide = true;
    await this.coursRepo.save(cours);
    return this.findOne(id);
  }

  async reject(id: string) {
    const cours = await this.coursRepo.findOneBy({ id });
    if (!cours) throw new NotFoundException('Cours non trouvé');
    cours.status = 'rejeté';
    await this.coursRepo.save(cours);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.coursRepo.delete(id);
    return { message: 'Suppression réussie' };
  }
}
