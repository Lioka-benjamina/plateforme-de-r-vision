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
    private coursRepo : Repository<Cours>,

    @InjectRepository(Matiere)
    private matiereRepo : Repository<Matiere>,

    @InjectRepository(User)
    private userRepo : Repository<User>,
  ){}

  async create(CourDto: CreateCourDto) {
    // const matiere = await this.matiereRepo.findOne({where : {id : CourDto.matiere_id}})
    // if (!matiere) {
    //   throw new NotFoundException("matiere non trouver")  : Promise<Cours> /  , auteurId : string
    // }



    return 'This action adds a new cour';
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
