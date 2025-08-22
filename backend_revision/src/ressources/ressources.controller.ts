import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RessourcesService } from './ressources.service';
import { CreateRessourceDto } from './dto/create-ressource.dto';
import { UpdateRessourceDto } from './dto/update-ressource.dto';

@Controller('ressources')
export class RessourcesController {
  constructor(private readonly ressourcesService: RessourcesService) {}

  @Post()
  create(@Body() createRessourceDto: CreateRessourceDto) {
    return this.ressourcesService.create(createRessourceDto);
  }

  @Get()
  findAll() {
    return this.ressourcesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ressourcesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRessourceDto: UpdateRessourceDto) {
    return this.ressourcesService.update(+id, updateRessourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ressourcesService.remove(+id);
  }
}
