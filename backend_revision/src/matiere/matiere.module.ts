import { Module } from '@nestjs/common';
import { MatiereService } from './matiere.service';
import { MatiereController } from './matiere.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matiere } from './entities/matiere.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Matiere])],
  controllers: [MatiereController],
  providers: [MatiereService],
})
export class MatiereModule {}
