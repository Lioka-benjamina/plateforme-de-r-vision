import { Module } from '@nestjs/common';
import { RessourcesService } from './ressources.service';
import { RessourcesController } from './ressources.controller';

@Module({
  controllers: [RessourcesController],
  providers: [RessourcesService],
})
export class RessourcesModule {}
