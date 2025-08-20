import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { CoursService } from './cours.service';
import { CreateCourDto } from './dto/create-cour.dto';
import { UpdateCourDto } from './dto/update-cour.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@Controller('cours')
export class CoursController {
  constructor(private readonly coursService: CoursService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCourDto: CreateCourDto, @Request() req)  {
    return this.coursService.create(createCourDto , req.user.id);
  }

  @Get()
  findAll() {
    return this.coursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourDto: UpdateCourDto) {
    return this.coursService.update(+id, updateCourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursService.remove(+id);
  }
}
