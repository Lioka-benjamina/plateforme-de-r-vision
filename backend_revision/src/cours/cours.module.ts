import { Module } from '@nestjs/common';
import { CoursService } from './cours.service';
import { CoursController } from './cours.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cours } from './entities/cour.entity';
import { Matiere } from 'src/matiere/entities/matiere.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cours, Matiere, User])],
  controllers: [CoursController],
  providers: [CoursService],
})
export class CoursModule {}
