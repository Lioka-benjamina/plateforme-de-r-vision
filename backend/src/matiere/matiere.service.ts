import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatiereDto } from './dto/create-matiere.dto';
import { UpdateMatiereDto } from './dto/update-matiere.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Matiere } from './entities/matiere.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatiereService {
  constructor(
    @InjectRepository(Matiere)
    private MatiereRepo : Repository<Matiere>
  ){}

  async createMatiere(MatiereDto: CreateMatiereDto) {
    const matiereExist = await this.MatiereRepo.findOne({where : {nom : MatiereDto.nom}})
    if (matiereExist) {
      throw new BadRequestException("matiere déjà exister")
    }
    
    const matiere =  this.MatiereRepo.create(MatiereDto)
    return await this.MatiereRepo.save(matiere);
  }

  async findAll() {
    return await this.MatiereRepo.find();
  }

  async findOne(id: string) {
    const oneMatiere = await this.MatiereRepo.findOne({where : { id }})
    return oneMatiere;
  }

  async update(id: string, MatiereDto: UpdateMatiereDto) {
    const matiere = await this.MatiereRepo.findOneBy({id})
    if (!matiere) {
      throw new NotFoundException("matiere non trouvé")
    }

    await this.MatiereRepo.update(id , MatiereDto)

    const MatiereUpdate = await this.MatiereRepo.findOneBy({id})
    return MatiereUpdate
    
  }

  async remove(id: string) {
    await this.MatiereRepo.delete(id)
    return `suppression succèss`;
  }
}
