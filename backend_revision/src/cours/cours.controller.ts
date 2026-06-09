import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { CoursService } from './cours.service';
import { CreateCourDto } from './dto/create-cour.dto';
import { UpdateCourDto } from './dto/update-cour.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { UserRole } from 'src/users/entities/user.entity';

const storage = diskStorage({
  destination: join(process.cwd(), 'uploads'),
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + extname(file.originalname));
  },
});

@Controller('cours')
export class CoursController {
  constructor(private readonly coursService: CoursService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROF, UserRole.PROFESSOR, UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('file', { storage }))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return { url: `/uploads/${file.filename}` };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROF, UserRole.PROFESSOR, UserRole.ADMIN)
  create(@Body() createCourDto: CreateCourDto, @Request() req: any) {
    return this.coursService.create(createCourDto, req.user.id);
  }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.coursService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourDto: UpdateCourDto) {
    return this.coursService.update(id, updateCourDto);
  }

  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  approve(@Param('id') id: string) {
    return this.coursService.approve(id);
  }

  @Patch(':id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  reject(@Param('id') id: string) {
    return this.coursService.reject(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursService.remove(id);
  }
}
