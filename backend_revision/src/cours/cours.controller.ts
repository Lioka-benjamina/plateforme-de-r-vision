import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CoursService } from './cours.service';
import { CreateCourDto } from './dto/create-cour.dto';
import { UpdateCourDto } from './dto/update-cour.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('cours')
export class CoursController {
  constructor(private readonly coursService: CoursService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROF, UserRole.PROFESSOR, UserRole.ADMIN)
  create(@Body() createCourDto: CreateCourDto, @Request() req: any) {
    return this.coursService.create(createCourDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.coursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourDto: UpdateCourDto) {
    return this.coursService.update(id, updateCourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursService.remove(id);
  }
}
