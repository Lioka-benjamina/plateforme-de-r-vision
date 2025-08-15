import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourDto } from './dto/create-cour.dto';
import { UpdateCourDto } from './dto/update-cour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cours } from './entities/cour.entity';
import { Repository } from 'typeorm';
import { Matiere } from 'src/matiere/entities/matiere.entity';
import { User, UserRole } from 'src/users/entities/user.entity';

@Injectable()
export class CoursService {

  constructor(
    @InjectRepository(Cours)
    private coursRepo: Repository<Cours>,

    @InjectRepository(Matiere)
    private matiereRepo: Repository<Matiere>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async create(CourDto: CreateCourDto, auteurId: string): Promise<Cours> {

    const auteur = await this.userRepo.findOne({ where: { id: auteurId } })
    if (!auteur) {
      throw new NotFoundException("utilisateur non trouvé")
    }

    if (auteur.role !== UserRole.PROF) {
      throw new ForbiddenException("seul le prof peut créer un cours")
    }

    const matiere = await this.matiereRepo.findOne({ where: { id: CourDto.matiere_id } })
    if (!matiere) {
      throw new NotFoundException("matiere non trouver")
    }

    const cours = this.coursRepo.create({
      titre: CourDto.titre,
      contenu: CourDto.contenu,
      matiere_id: matiere.id,
      auteur: auteur,
      valide: false, 
    })

    return await this.coursRepo.save(cours);
  }

  findAll() {
    return `This action returns all cours`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cour`;
  }

  update(id: number, updateCourDto: UpdateCourDto) {
    return `This action updates a #${id} cour`;
  }

  remove(id: number) {
    return `This action removes a #${id} cour`;
  }
}
