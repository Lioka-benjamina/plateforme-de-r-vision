import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MatiereService } from './matiere.service';
import { CreateMatiereDto } from './dto/create-matiere.dto';
import { UpdateMatiereDto } from './dto/update-matiere.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';

@Controller('matiere')
export class MatiereController {
  constructor(private readonly matiereService: MatiereService) {}

  @Post()
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createMatiereDto: CreateMatiereDto) {
    return this.matiereService.createMatiere(createMatiereDto);
  }

  @Get()
  findAll() {
    return this.matiereService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matiereService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatiereDto: UpdateMatiereDto) {
    return this.matiereService.update(id, updateMatiereDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matiereService.remove(id);
  }
}
