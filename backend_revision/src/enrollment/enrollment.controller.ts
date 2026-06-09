import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async enroll(@Body() body: { coursId: string }, @Request() req: any) {
    return await this.enrollmentService.enroll(body.coursId, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async myEnrollments(@Request() req: any) {
    const enrollments = await this.enrollmentService.findByUser(req.user.id);
    return enrollments.map((e) => ({
      id: e.id,
      coursId: e.cours_id,
      coursTitre: e.cours?.titre || 'Cours',
      professor: e.cours?.auteur
        ? `${e.cours.auteur.prenom} ${e.cours.auteur.nom}`
        : 'Professeur',
      progress: e.progress,
      lessonsCompleted: e.lessonsCompleted,
      totalLessons: e.totalLessons,
      enrolledAt: e.enrolledAt,
    }));
  }

  @Get('course/:coursId')
  @UseGuards(JwtAuthGuard)
  async courseEnrollments(@Param('coursId') coursId: string) {
    return await this.enrollmentService.findByCourse(coursId);
  }

  @Patch(':coursId/progress')
  @UseGuards(JwtAuthGuard)
  async updateProgress(@Param('coursId') coursId: string, @Request() req: any) {
    return await this.enrollmentService.updateProgress(coursId, req.user.id);
  }
}
